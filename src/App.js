import { useRef, useState } from 'react';
import './App.css';

function Review({ reviewObj }) {
  return (
    <div className="flex flex-col h-[500px] bg-red-200 p-10">
      <h1>{reviewObj.title}</h1>
      <h1>{reviewObj.author}</h1>
    </div>
  )
}

function App() {
  const reviews = [ { title: "Great product", author: "Author A"}, { title: "Great product", author: "Author A"}, { title: "Great product", author: "Author A"} ];
  const scrollRef = useRef(null);

  const executeScroll = () => scrollRef.current.scrollIntoView({ behavior: "smooth" });
  
  return (
    <div className="flex flex-col space-y-10 items-center min-h-screen bg-blue-100">
      <button onClick={executeScroll} className="p-10 bg-white">Scroll</button>
      {
        reviews.map((reviewObj) => <Review reviewObj={reviewObj} />)
      }
      <div ref={scrollRef} className="p-20 bg-green-200">Scroll to here</div>
    </div>
  );
}

export default App;
