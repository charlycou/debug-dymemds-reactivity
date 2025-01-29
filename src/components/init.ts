import { createModel } from "@core";

const model = await createModel();

// When the model outputs are updated, refresh the graph
// model.onOutputsChanged = () => {
//   // if (graphView) {
//   //   graphView.updateData();
//   // }
//   console.log("oops onOutputsChanged");
// };

export default model;
