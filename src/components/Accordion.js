import React, {useState} from 'react'

export default function Accordion({items}) {
    //hook syntax
    //const [indexName, settingMethodName] = useState(intialValue)
    //in classbased component, we can update multiple states at the same time (i.e. this.setState={var1:1,var2:2})
    //this is not the case in function. you need to use useState each time so it's more verbose
    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index)
    }

    const renderedItems = items.map(
        (item, index) => {
            const active = index === activeIndex ? 'active' : '';
            return (
                // if you don't want to return div but a react fragment (tag) instead
                <React.Fragment key={item.title}>
                    <div 
                        className={`title ${active}`} 
                        //if we do onClick = {onTitleClick(index)}, it will call this method the instand it's rendered.
                        //we only want to call it when the div is clicked so anon arrow function is required
                        onClick={()=>onTitleClick(index)}
                    >
                        <i className="dropdown icon"></i>
                        {item.title}
                    </div>
                    <div className={`content ${active}`}>
                        <p>{item.content}</p>
                    </div>
                </React.Fragment>
            )
        }
    )

    return (
        <div className="ui styled accordion">
            {renderedItems}
            {activeIndex}
        </div>
    )
}
