import directiveFocus from "./focus";
import directiveUnit from "./unit";
import directiveFtime from "./ftime";



export default function directive(app) {
  directiveFocus(app);
  directiveUnit(app);
  directiveFtime(app);
}
