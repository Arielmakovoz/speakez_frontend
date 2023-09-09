const Loading: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
