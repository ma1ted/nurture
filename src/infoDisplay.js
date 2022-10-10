import { detect } from "detect-browser";

export default function () {
	const ua = detect();
	const infoDisplay = document.getElementById("info-display");

	const deviceInfo = () =>
		`| ${ua.name.toLowerCase()} on ${ua.os.toLowerCase()} |`;

	infoDisplay.textContent = deviceInfo();

	document.addEventListener("mousemove", (event) => {
		infoDisplay.textContent =
			`| x: ${event.clientX} y: ${event.clientY} ` + deviceInfo();
	});
}
