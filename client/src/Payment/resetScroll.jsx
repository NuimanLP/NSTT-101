// MyComponent.js
import React, { useEffect } from 'react';

function ResetScroll() {
  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);

    // Optionally, you can also listen for changes that require resetting the scroll
    const handleScrollReset = () => {
      window.scrollTo(0, 0);
    };

    // Attach scroll event listener to reset scroll when necessary
    window.addEventListener('scrollReset', handleScrollReset);

    // Clean up function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('scrollReset', handleScrollReset);
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

export default ResetScroll;
