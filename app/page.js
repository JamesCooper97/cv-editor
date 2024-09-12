import CVEditor from "../app/components/CVEditor";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="page">
      <main>
        <div className="title">
          <h1>James Cooper</h1>
        </div>
        <CVEditor />
      </main>
    </div>
  );
}
