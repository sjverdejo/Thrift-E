import NewListing from '../components/items/NewListing.js'

const CreateListing = () => {
  return (
    <div class='flex flex-col justify-center items-center'>
      <h1 class='text-3xl pt-10 mb-5'>Create a New Listing!</h1>
      <NewListing />  
    </div>
  )
}

export default CreateListing