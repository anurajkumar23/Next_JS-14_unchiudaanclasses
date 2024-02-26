export default async function getUserData(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login/success`,
    { withCredentials: true },
    { cache: 'no-store' },
    ) 
    const data = await response.json();
    // const Userdata = data.user;
    console.log(data, "😁😁😁😁😁😁😁😁😁😁😁😁😁😁")
}