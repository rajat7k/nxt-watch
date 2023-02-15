export default function GetYearDifference(pastDate) {
    const d1=new Date(pastDate);
    const d2=new Date();
    const yearDifference=d2.getFullYear()-d1.getFullYear();
    return yearDifference
}
