import { useParams } from "react-router-dom";

export default function ProductCategory() {
    const params = useParams();
  return (
    <>
          <div>{params.category}</div>
    </>
  );
}