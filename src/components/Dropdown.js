import React, {useState, useEffect, useRef} from 'react';


//important lesson: dropdown event handler cannot easily listen to parent events (i.e. body of page)
//review: event-bubbling = event travels up until it encounters same event higher up in lexical context
//review2: whichever event handler that gets added manually (i.e. addEventListener) gets called first before React's event handler
const Dropdown = ({label, options, selected, onSelectedChange})=>{
    const [open, setOpen] = useState(false);
    //note when this components get hidden or removed, ref also becomes null
    const ref = useRef();

    //reminder- empty array if we only want to run it once. We don't need to keep adding event listeners
    //essentially this is somewhat behaving like componentDidMount for state handling in functional components
    //scenario 1: click on rendered item = don't want the click on body to do anything 
    //scenario 2: click on body = we want the body event listener to close dropdown 
    //utilize useRef to decide whether it was click on body or click on an element rendered by this component, in this case top level form div
    //useEffect gets called when we remove component so we can use clean up function at that time if needed
    //make sure to add the final clean up when attaching event listeners to dom higher up in lexical context
    useEffect(()=>{
        const onBodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)){
                return;
            };
            setOpen(false);
        }
        document.body.addEventListener('click', onBodyClick)
        return () => {
            document.body.removeEventListener('click', onBodyClick)
        };
    },[])

    //typical to attach selection event handlers on func returning jsx of options
    const renderedOptions = options.map((option)=>{
        //good to remember: filtering results to prevent displaying duplicate options
        if(option.value === selected.value){
            return null;
        }
        return(
            <div 
                key={option.value} 
                className="item"
                onClick={()=>onSelectedChange(option)}
            >
                {option.label}
            </div>
        );
    });
    return (
        <div className="ui form" ref={ref}>
            <div className="field">
                <label className="label">{label}</label>
            </div>
            {/* good to remember this logic on toggling - only show dropdown values when user clicks dropdown*/}
            <div 
                className={`ui selection dropdown ${open? 'visible active' : ''}`}
                onClick={()=>setOpen(!open)}
            >
                <i className="dropdown icon"></i>
                <div className="text">
                    {selected.label}
                </div>
                <div className={`menu ${open ? 'visible transition' : ''}`}>
                    {renderedOptions}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;