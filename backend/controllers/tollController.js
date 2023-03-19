import { TollTax } from "../TollDB/TollSchema.js";

const tollController = async (req, res, next) => {
  const { entryPoint, exitPoint, dayOfWeek, numberPlate } = req.body;

  // // // Calculate toll tax
  const distance = (exitPoint - entryPoint) * 10; // Calculate distance using entryPoint and exitPoint
  const baseRate = 20;
  const distanceRate = dayOfWeek === "sat" || dayOfWeek === "sun" ? 3 : 2;
  const tollTax = baseRate + distance * distanceRate;
  console.log(entryPoint, exitPoint, dayOfWeek, numberPlate, tollTax);

  try {
    const tollTaxRecord = await TollTax.create({
      entryPoint,
      exitPoint,
      dayOfWeek,
      numberPlate,
      distance,
      tollTax,
    });

    res.json(tollTaxRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save toll tax to database" });
  }
};
export default tollController;
