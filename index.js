const ratio = 2;
const scrWidth = 2000;
const scrHeight = scrWidth / ratio;
let x = -2;
let y = -0.5;
let width = 6;
let height = 2;

function setup() {
	createCanvas(scrWidth, scrHeight);
	background(50);
	redraw__();
}

const approximatelyEquals = (a, b, epsilon) => Math.abs(a - b) < epsilon;

const getNextGenPopulation = (r, population) => {
	return r * population * (1 - population);
};

const getStablePoints = (r) => {
	const populations = [0.5];
	while (true) {
		const nextGenPopulation = getNextGenPopulation(r, populations[populations.length - 1]);

		const periodStartIndex = populations.findIndex((value) =>
			approximatelyEquals(value, nextGenPopulation, Number.EPSILON)
		);

		if (periodStartIndex !== -1) {
			const period = populations.slice(periodStartIndex);
			return period;
		} else if (populations.length > 1000) {
			const period = populations.slice(900);
			return period;
		}

		populations.push(nextGenPopulation);
	}
};

const redraw__ = () => {
	background(50);
	stroke(255);
	for (let pixelX = 0; pixelX < scrWidth; pixelX++) {
		const r = map(pixelX, 0, scrWidth, x, x + width);
		const stablePoints = getStablePoints(r);
		for (const stablePoint of stablePoints) {
			const pixelY = map(stablePoint, y, y + height, scrHeight, 0);
			point(pixelX, pixelY);
		}
	}
};

function mousePressed() {
	const zoomRatio = 2;
	const mappedX = map(mouseX, 0, scrWidth, x, x + width);
	const mappedY = map(mouseY, 0, scrHeight, y + height, y);
	console.log(mappedX, mappedY);
	width /= zoomRatio;
	height /= zoomRatio;
	x = mappedX - width / 2;
	y = mappedY - height / 2;
	redraw__();
}
