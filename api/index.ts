import perstorp from "perstorp";

const PORT = 3000;

const app = perstorp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
