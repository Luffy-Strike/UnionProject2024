const calculateAspectRatio = (width, height) => width / height;

export default (data) => data.filter(({ width, height }) => {
  const aspectRatio = calculateAspectRatio(width, height);
  const epsilon = 0.1;
  const targetAspectRatio = 4 / 3;
  return Math.abs(aspectRatio - targetAspectRatio) < epsilon;
});