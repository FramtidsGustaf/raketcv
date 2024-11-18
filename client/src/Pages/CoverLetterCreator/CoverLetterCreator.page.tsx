import { TextEditor } from "../../components/TextEditor/TextEditor";
import { coverLetterStore } from "../../store/coverLetter.store";

export const CoverLetterCreatorPage = () => {
  return <TextEditor content={coverLetterStore.coverLetter.html} />;
};
