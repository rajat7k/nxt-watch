
export default function GetYearDifference(props) {
    const {pastDate}=props;
    const d1=new Date(pastDate);
    const d2=new Date();
    const yearDifference=d2.getFullYear()-d1.getFullYear();
    return yearDifference
}
