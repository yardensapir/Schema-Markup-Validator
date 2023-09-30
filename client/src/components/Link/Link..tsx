import React from "react";

type Props = {
  item: string
  index: string
  url: string
  handleRemoveUrl: (url:string) => {}
}


  ;
const Link = ({ item, index,handleRemoveUrl }: Props) => {



  return <div className="md:flex items-center justify-between">

    <p className="font-montserrat text-sm font-bold">{item}</p>

    <button onClick={() => { handleRemoveUrl(index) }} className="z">Remove URL</button>
  </div>;
};
export default Link