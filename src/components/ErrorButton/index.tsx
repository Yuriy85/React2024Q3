import { useEffect, useState } from 'react';

function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      throw new Error("It's my handle fault!!!");
    }
  }, [hasError]);

  return (
    <button onClick={() => setHasError(true)} className="error-button">
      Error
    </button>
  );
}

export default ErrorButton;
