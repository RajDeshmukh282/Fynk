import React from "react";

const SignUp = () => {
  return (
    <>
      <div
        className="w-full h-screen bg-gradient-to-b
 from-black to-gray-900 flex flex-col justify-center items-center"
      >
        <div class="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
          <div class="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]"></div>

          <div class="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black"></div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
