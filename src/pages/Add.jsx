// import { useState, useEffect } from 'react';
// import React from 'react';
// import { getAuth } from 'firebase/auth';
// import SignIn from './SignIn';
// function Add() {
//   const [user, setUser] = useState(null);

//   const auth = getAuth();
//   useEffect(() => {
//     setUser(auth.currentUser);
//   }, []);

//   return user ? (
//     <>
//       <section className="add-section">
//         <div className="container">
//           <h1 className="add-heading">Welcome to the babershop</h1>
//           <p className="add-subtext">Take a look at the mirror</p>

//           <form action="Artgallery.html" className="form-add" runat="server">
//             <div className="flex">
//               <div className="details">
//                 <div className="form-block">
//                   <label htmlFor="discord">Discord id </label>
//                   <input
//                     type="text"
//                     name=""
//                     id="discord"
//                     placeholder="weirdstoner.eth #6163"
//                   />
//                 </div>

//                 <div className="form-block">
//                   <label htmlFor="twitter-handle">Twitter handle</label>
//                   <input
//                     type="text"
//                     name=""
//                     id="twitter-handle"
//                     placeholder="weirdstoner_eth"
//                   />
//                 </div>
//               </div>
//               <div className="file-block">
//                 <label htmlFor="file">
//                   <p className="art-btn">Upload art</p>
//                   <input
//                     type="file"
//                     name=""
//                     id="file"
//                     style="display: none"
//                     accept="image/*"
//                   />
//                   <img id="output" width="100%" />
//                 </label>
//               </div>
//             </div>
//             <button type="submit" className="btn-upload">
//               Submit
//             </button>
//           </form>
//         </div>
//       </section>
//     </>
//   ) : (
//     <SignIn />
//   );
// }

// export default Add;
