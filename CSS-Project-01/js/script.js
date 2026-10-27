const bodyColour = document.getElementById("body-colour");
const bodySize = document.getElementById("body-size");
const bodyRoundness = document.getElementById("body-roundness");
const eyeSize = document.getElementById("eye-size");
const eyeSpacing = document.getElementById("eye-spacing");
const mouthShape = document.getElementById("mouth-shape");
const resetButton = document.getElementById("reset-button");

const blobBody = document.getElementById("blob-body");
const leftEye = document.querySelector("#blob-face ellipse:first-of-type");
const rightEye = document.querySelector("#blob-face ellipse:nth-of-type(2)");
const mouth = document.querySelector("#blob-face path");
const gradientStart = document.querySelector("#blob-gradient stop:first-of-type");
const gradientEnd = document.querySelector("#blob-gradient stop:last-of-type");

const defaultSettings = {
colour: "#8a76d9",
size: 100,
roundness: 50,
eyeSize: 9,
eyeSpacing: 70,
mouthShape: "smile"
};

const originalBlobPath =
"M150 40 C220 35 265 90 255 155 C250 220 210 260 145 260 C80 260 40 215 45 150 C45 85 85 45 150 40 Z";

function updateBlob() {
const size = Number(bodySize.value);
const roundness = Number(bodyRoundness.value);
const scale = size / 100;


// Resize the body around its centre.
blobBody.setAttribute(
    "transform",
    `translate(150 150) scale(${scale}) translate(-150 -150)`
);

// Change the body shape without changing its overall scale.
const widthFactor = 0.7 + (roundness / 100) * 0.6;
const heightFactor = 1.3 - (roundness / 100) * 0.6;

blobBody.setAttribute(
    "d",
    `M150 ${150 - 110 * heightFactor}
     C${150 + 70 * widthFactor} ${150 - 115 * heightFactor},
      ${150 + 120 * widthFactor} ${150 - 45 * heightFactor},
      ${150 + 105 * widthFactor} ${150 + 5 * heightFactor}
     C${150 + 100 * widthFactor} ${150 + 80 * heightFactor},
      ${150 + 55 * widthFactor} ${150 + 110 * heightFactor},
      ${150 - 5 * widthFactor} ${150 + 110 * heightFactor}
     C${150 - 70 * widthFactor} ${150 + 110 * heightFactor},
      ${150 - 115 * widthFactor} ${150 + 65 * heightFactor},
      ${150 - 105 * widthFactor} ${150}
     C${150 - 105 * widthFactor} ${150 - 65 * heightFactor},
      ${150 - 60 * widthFactor} ${150 - 110 * heightFactor},
      150 ${150 - 110 * heightFactor} Z`
);

// Resize the eyes.
const eyes = Number(eyeSize.value);
leftEye.setAttribute("rx", eyes);
leftEye.setAttribute("ry", eyes * 1.3);
rightEye.setAttribute("rx", eyes);
rightEye.setAttribute("ry", eyes * 1.3);

// Move the eyes closer together or further apart.
const spacing = Number(eyeSpacing.value);
leftEye.setAttribute("cx", 150 - spacing / 2);
rightEye.setAttribute("cx", 150 + spacing / 2);

updateMouth();
updateColour();


}

function updateMouth() {
const shape = mouthShape.value;


if (shape === "smile") {
    mouth.setAttribute("d", "M135 170 Q150 185 165 170");
} else if (shape === "flat") {
    mouth.setAttribute("d", "M135 175 L165 175");
} else if (shape === "surprised") {
    mouth.setAttribute(
        "d",
        "M150 170 m-8 0 a8 10 0 1 0 16 0 a8 10 0 1 0 -16 0"
    );
}


}

function updateColour() {
const colour = bodyColour.value;


gradientStart.setAttribute("stop-color", colour);
gradientEnd.setAttribute("stop-color", colour);
gradientEnd.setAttribute("stop-opacity", "0.65");


}

function resetBlob() {
bodyColour.value = defaultSettings.colour;
bodySize.value = defaultSettings.size;
bodyRoundness.value = defaultSettings.roundness;
eyeSize.value = defaultSettings.eyeSize;
eyeSpacing.value = defaultSettings.eyeSpacing;
mouthShape.value = defaultSettings.mouthShape;


updateBlob();


}

bodyColour.addEventListener("input", updateColour);
bodySize.addEventListener("input", updateBlob);
bodyRoundness.addEventListener("input", updateBlob);
eyeSize.addEventListener("input", updateBlob);
eyeSpacing.addEventListener("input", updateBlob);
mouthShape.addEventListener("change", updateMouth);
resetButton.addEventListener("click", resetBlob);

updateBlob();
