import { useRecoilValue } from "recoil";
import { loadingAtom } from "../store/atoms/loginState";
export default function GlobalLoader() {
  const loading = useRecoilValue(loadingAtom);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-md shadow-lg">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
}
