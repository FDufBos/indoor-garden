import { useRouter } from "next/router";

import CodexPage from "../../components/fullPages/codexPage";

export const ConstItem: React.FC = () => {
  const router = useRouter();
  const { plant } = router.query;

  return (
    <div>
      <h1>{plant}</h1>
      <CodexPage/>
    </div>
  );
}

export default ConstItem;