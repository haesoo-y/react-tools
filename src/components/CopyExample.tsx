import { useCopy } from "@hooks/useCopy";

const CopyExample = () => {
  const { isCopied, copyToClipboard } = useCopy(); // useCopy 훅 사용

  const textToCopy = "복사할 텍스트입니다!";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>{textToCopy}</p>
      <button onClick={() => copyToClipboard(textToCopy)}>
        {isCopied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
};

export default CopyExample;
