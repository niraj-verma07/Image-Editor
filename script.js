let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const filtersContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

// Function to create a filter element
function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    // console.log(input.value);
    filters[name].value = input.value;
    // console.log(name, filters[name]);
    applyFilters();
  });

  return div;
}

// Making filter elements dynamically
function createFilters() {
  // Object.keys(filters) => converts the filters object into an array of its keys
  Object.keys(filters).forEach((filter) => {
    //   console.log(filter, filters[filter]);

    const filterElement = createFilterElement(
      filter,
      filters[filter].unit,
      filters[filter].value,
      filters[filter].min,
      filters[filter].max,
    );

    filtersContainer.appendChild(filterElement);
  });
}

createFilters();

imageInput.addEventListener("change", (event) => {
  file = event.target.files[0];

  const imagePlaceholder = document.querySelector(".placeholder");
  imageCanvas.style.display = "block";
  imagePlaceholder.style.display = "none";

  // console.log(file)
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `
  brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  invert(${filters.invert.value}${filters.invert.unit})
  `;
  canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };

  applyFilters();
  filtersContainer.innerHTML = "";
  createFilters();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

const presets = {
  drama: {
    brightness: 95,
    contrast: 140,
    saturation: 130,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 90,
    saturation: 85,
    hueRotation: 10,
    blur: 0,
    grayscale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    brightness: 100,
    contrast: 110,
    saturation: 70,
    hueRotation: 0,
    blur: 1,
    grayscale: 20,
    sepia: 60,
    opacity: 100,
    invert: 0,
  },

  blackAndWhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  cinematic: {
    brightness: 95,
    contrast: 130,
    saturation: 110,
    hueRotation: -10,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  soft: {
    brightness: 110,
    contrast: 85,
    saturation: 90,
    hueRotation: 5,
    blur: 1,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  coolTone: {
    brightness: 100,
    contrast: 110,
    saturation: 95,
    hueRotation: 200,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetBtn = document.createElement("button");
  presetBtn.classList.add("btn");
  presetBtn.innerText = presetName;
  presetsContainer.appendChild(presetBtn);

  presetBtn.addEventListener("click", () => {
    const preset = presets[presetName];
    // console.log(preset);
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
  });
});
