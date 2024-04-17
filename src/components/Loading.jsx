import LoadingStyle from "./components-styles/Loading.module.css";

function Loading() {
  return (
    <div className={LoadingStyle.loadingParent}>
      <div className={LoadingStyle.loadingSpinner}>
        <div className={LoadingStyle.innerLoadingSpinner}></div>
      </div>
    </div>
  );
}

export default Loading;
