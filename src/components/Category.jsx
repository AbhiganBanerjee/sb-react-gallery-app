import {Select, SelectItem} from "@nextui-org/react";
import { useState } from "react";

const Category = ({categories,isTheme,isMatch,onChange})=>{
    
    const [selectedItem, setSelectedItem] = useState(null);
    
    return(
        <>
            <Select style=
                {{
                    fontFamily:"monospace",
                    marginTop:"20px", 
                    fontWeight:"bold",
                    width:isMatch?"200px" : "250px"
                }} 
                onChange={onChange}
                color={isTheme?'warning':'primary'}
                label="Select Categories" 
                className="max-w-xs" 
            >
                {categories.map((animal) => (
                    <SelectItem style={{fontFamily:"monospace"}} variant='shadow' value={animal} color={isTheme?'warning':'primary'} className={isTheme?'text-warning':'text-primary'} key={animal}>
                        {animal}
                    </SelectItem>
                ))}
            </Select>
        </>
    );
}
export default Category;