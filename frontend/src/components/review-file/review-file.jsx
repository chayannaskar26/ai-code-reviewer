import './review-file.css'
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpRightAndDownLeftFromCenter, faPlay } from "@fortawesome/free-solid-svg-icons"

function ReviewFile({ onChildData }) {

	const [fileText, setFileText] = useState("");
	const [fileName, setFileName] = useState("");
	const [fileUploaded, setFileUploaded] = useState(false);
	const [fileLines, setFileLines] = useState(0);

	const handleReset = () => {
		setFileText("");
		setFileName("");
		setFileUploaded(false);
		setFileLines(0);
	}

	const handleFileChange = async () => {
		const fileInput = document.getElementById('codeUpload');
		const file = fileInput.files[0];

		if (!file) alert('No File Selected!');

		const content = await file.text();
		const name = await file.name;
		const lines = content.split(/\r?\n/).length;

		setFileText(content);
		setFileName(name);
		setFileUploaded(true);
		setFileLines(lines);
	};

	const sendToParent = () => {
		onChildData(fileText);
	};

	return (
		<>
			{(!fileUploaded) && <div className="container mt-4">
				<div className="code-upload-container">
					<label className="form-label fw-bold small mb-2 text-light-gray">Upload Source File</label>
					<div className="input-group">
						<input type="file" className="form-control custom-code-input" id="codeUpload" accept=".js, .py, .ts"/>
							<button className="btn btn-primary px-4" type="button" id="uploadBtn" onClick={handleFileChange}>
								<i className="bi bi-cloud-arrow-up"></i> Preview Code
							</button>
					</div>
					<div className="form-text mt-2 text-light-gray ">
						Supported formats: .js, .py, .ts
					</div>
				</div>
			</div>
			}
			{(fileUploaded) && <div className="container code-container p-3">
				<div className="d-flex justify-content-between align-items-center mb-2">
					<div className="d-flex align-items-center gap-2">
						<span className="text-light fw-semibold">{fileName}</span>
					</div>

					<div className="d-flex gap-2">
						{/* <button className="btn btn-sm btn-dark">Copy</button> */}
						<button className="btn btn-sm btn-dark"><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /></button>
					</div>
				</div>

				<div className="code-box p-3">
					<pre>
						<code>
							{fileText}
						</code></pre>
				</div>
				<div className="d-flex justify-content-between align-items-center mt-3">
					<div className="d-flex gap-2">
						<button className="btn btn-primary px-3" onClick={sendToParent}><FontAwesomeIcon icon={faPlay} />Review Code</button>
						<button className="btn btn-secondary px-3" onClick={handleReset}>Reset</button>
					</div>

					<small className="text-light-gray">{fileLines} lines</small>
				</div>

			</div>
			}
		</>
	)
}

export default ReviewFile
