import React, {useState} from 'react'
import Accordion from './components/Accordion'
import Search from './components/Search'
import Dropdown from './components/Dropdown'
import Translate from './components/Translate'
import Route from './components/Route';
import Header from './components/Header';


const items = [
    {title: 'what is react', content: 'react is a front-end js framework'},
    {title: 'why use react', content: 'react is a favorite js library among engineers'},
    {title: 'how do you use react', content: 'you use react by creating components'}
]

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    }
]


export default function App() {
    const [selected, setSelected] = useState(options[0]);
    return (
        <div>
            <Header />
            <Route path="/">
               {/* inner elements are passed on as prop called children */}
               <Accordion items={items} />
            </Route>
            <Route path="/list">
                <Search />
            </Route>
            <Route path="/dropdown">
                <Dropdown 
                    label = "select a color"
                    options={options}
                    selected={selected}
                    onSelectedChange={setSelected}
                />
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </div>
    )
}
