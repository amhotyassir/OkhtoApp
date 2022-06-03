import call from "react-native-phone-call"
export const calls= async()=>{
    const args = {
        number: '+212618902632', // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
      }
      
      call(args).catch(console.error)
}