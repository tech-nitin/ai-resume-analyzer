import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2image";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "~/constants";
import { extractPdfText } from "~/lib/pdfToText";

const Upload = () => {
    const { fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };

    const handleAnalyze = async ({
                                     companyName,
                                     jobTitle,
                                     jobDescription,
                                     file,
                                 }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }) => {
        try {
            setIsProcessing(true);

            // Upload Resume
            setStatusText("Uploading Resume...");
            const uploadedFile = await fs.upload([file]);

            if (!uploadedFile) {
                setStatusText("Failed to upload resume.");
                return;
            }

            // Convert PDF -> Image
            setStatusText("Generating Preview...");
            const imageFile = await convertPdfToImage(file);

            if (!imageFile.file) {
                setStatusText("Failed to generate preview.");
                return;
            }

            // Upload Image
            setStatusText("Uploading Preview...");
            const uploadedImage = await fs.upload([imageFile.file]);

            if (!uploadedImage) {
                setStatusText("Failed to upload preview.");
                return;
            }

            // Extract PDF Text
            setStatusText("Reading Resume...");
            const resumeText = await extractPdfText(file);

            if (!resumeText || resumeText.trim().length < 30) {
                setStatusText("Could not extract resume text.");
                return;
            }

            // Save Initial Data
            const uuid = generateUUID();

            const data: any = {
                id: uuid,
                companyName,
                jobTitle,
                jobDescription,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                feedback: null,
            };

            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            // AI Analysis
            setStatusText("Analyzing Resume...");

            const prompt = `
Resume:

${resumeText}

${prepareInstructions({
                jobTitle,
                jobDescription,
            })}
`;

            const response = await ai.chat(prompt);

            if (!response) {
                setStatusText("AI failed to generate feedback.");
                return;
            }

            const feedbackText =
                typeof response.message.content === "string"
                    ? response.message.content
                    : response.message.content[0].text;

            console.log("RAW AI RESPONSE:");
            console.log(feedbackText);

            // Remove Markdown
            let cleaned = feedbackText
                .replace(/```json/gi, "")
                .replace(/```/g, "")
                .trim();

            // Keep JSON only
            const start = cleaned.indexOf("{");
            const end = cleaned.lastIndexOf("}");

            if (start === -1 || end === -1) {
                throw new Error("No JSON found.");
            }

            cleaned = cleaned.substring(start, end + 1);

            console.log("CLEANED JSON:");
            console.log(cleaned);

            const parsedFeedback = JSON.parse(cleaned);

            data.feedback = parsedFeedback;

            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            console.log("Saved Resume Data");
            console.log(data);

            setStatusText("Analysis Complete!");

            navigate(`/resume/${uuid}`);
        } catch (err) {
            console.error(err);
            setStatusText("Something went wrong while analyzing the resume.");
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const companyName = formData.get("company-name") as string;
        const jobTitle = formData.get("job-title") as string;
        const jobDescription = formData.get("job-description") as string;

        if (!file) return;

        handleAnalyze({
            companyName,
            jobTitle,
            jobDescription,
            file,
        });
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>

                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>

                            <img
                                src="/images/resume-scan.gif"
                                className="w-full"
                                alt="Scanning"
                            />
                        </>
                    ) : (
                        <h2>
                            Drop your resume for an ATS score and improvement
                            tips
                        </h2>
                    )}

                    {!isProcessing && (
                        <form
                            id="upload-form"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 mt-8"
                        >
                            <div className="form-div">
                                <label htmlFor="company-name">
                                    Company Name
                                </label>

                                <input
                                    id="company-name"
                                    name="company-name"
                                    type="text"
                                    placeholder="Google"
                                />
                            </div>

                            <div className="form-div">
                                <label htmlFor="job-title">
                                    Job Title
                                </label>

                                <input
                                    id="job-title"
                                    name="job-title"
                                    type="text"
                                    placeholder="Frontend Developer"
                                />
                            </div>

                            <div className="form-div">
                                <label htmlFor="job-description">
                                    Job Description
                                </label>

                                <textarea
                                    id="job-description"
                                    rows={6}
                                    name="job-description"
                                    placeholder="Paste Job Description..."
                                />
                            </div>

                            <div className="form-div">
                                <label>Upload Resume</label>

                                <FileUploader
                                    onFileSelect={handleFileSelect}
                                />
                            </div>

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Upload;