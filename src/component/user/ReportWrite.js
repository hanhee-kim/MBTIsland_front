import { useReducer } from "react";
import { reportReducer, initState } from "../../reducer/reportReducer";

function ReportWrite() {
  const [report, dispatch] = useReducer(reportReducer, initState);

  return(
    <div></div>
  );
}

export default ReportWrite;