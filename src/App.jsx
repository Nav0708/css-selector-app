import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {generateSelector} from './specificityGenerator.js'
import './App.css'


function App() {
  const [selector, setSelector] = useState([]);
  const [id, setId] = useState('');
  const [sclass, setSClass] = useState('');
  const [type, setType] = useState('');
  const [numericValue, setNumericValue] = useState('');
  const tagNames = ['div', 'p', 'input', 'a', 'button', 'span', 'ul', 'li', 'ol', 'form', 'label', 'h1', 'h2', 'legend', 'textarea', 'select', 'option', 'table', 'tr', 'td', 'th', 'img', 'section', 'article', 'nav', 'fieldset', 'figcaption', 'figure'];
  const pseudoClasses = [':first-child', ':last-child', ':nth-child(even)', ':nth-child(odd)', ':active', ':checked', ':visited', ':hover'];
  const pseudoElements = ['::before', '::after', '::first-letter', '::first-line'];
  const names = ['broccoli', 'kale', 'spinach', 'pea', 'carrot', 'broccolini', 'cabbage', 'cauliflower', 'cilantro', 'basil', 'parsley', 'cardamom', 'cinnamon', 'clove', 'cumin', 'ginger', 'garam-masala', 'turmeric'];
  const combinators = [' ', ' > ', ' + ', ' ~ '];
  const [text,setText]=useState('');
  const [name,setName]=useState('');
  const [specWeight, setSpecWeight]=useState([]);
  const [matchID,setMatchID]=useState( false );
  const [matchClass,setMatchClass]=useState( false );
  const [matchType,setMatchType]=useState( false );

  function calculateSpecificity(selectorArray) {
    return selectorArray.reduce(
      (specificity, selector) => {
        const idSelectors = (selector.match(/#/g) || []).length;
        const classSelectors = (selector.match(/\./g) || []).length;
        const typeSelectors = selector.split(/[.#\[:]/).filter(Boolean).length - idSelectors - classSelectors;
        specificity[0] += idSelectors;
        specificity[1] += classSelectors;
        specificity[2] += typeSelectors;
        return specificity;
      },
      [0, 0, 0]
    );
  }
  
  const handleRandomizeClick = () => {
    setId(''); 
    setSClass(''); 
    setType('');
    const generatedSelector = generateSelector();
    const specificity=calculateSpecificity(generatedSelector)
    console.log(specificity);
    setSpecWeight(specificity);
    setSelector(generatedSelector);
  };
  const handleIdinputChange = (e) => {
    const value = Number(e.target.value);
    setId(value);
    const match = value === specWeight[0];
    e.target.classList.toggle('id-mismatch', !match);
    e.target.classList.toggle('id-match', match);
    console.log(`Entered ID: ${value}, Spec Weight: ${specWeight[0]}, Is Match: ${match}`);
  };
  const handleClassinputChange = (e) => {
    const value = Number(e.target.value);
    setSClass(value);
    const match = value === specWeight[1];
    e.target.classList.toggle('class-mismatch', !match);
    e.target.classList.toggle('class-match', match);
    console.log(`Entered ID: ${value}, Spec Weight: ${specWeight[1]}, Is Match: ${match}`);
  };
  const handleTypeinputChange = (e) => {
    const value = Number(e.target.value);
    setType(value);
    const match = value === specWeight[2];
    e.target.classList.toggle('type-mismatch', !match);
    e.target.classList.toggle('type-match', match);
    console.log(`Entered ID: ${value}, Spec Weight: ${specWeight[2]}, Is Match: ${match}`);
  };
  const handleElementClick = (item) => {
     if(tagNames.includes(item))
     {
      const label=`"`+item+`"`+': Tag name';
      setName(label);
      const concatenatedString="Matches elements by node name. In other words, it selects all elements of the given type within a document";
      setText(concatenatedString);
     }
     if(pseudoClasses.includes(item))
     {
      if(item==':first-child')
      {
        const label=`"`+item+`"`+': :first-child Pseudo-Class';
        setName(label);
        const concatenatedString='Matches an element that is the first child of its parent. It selects elements that have no preceding siblings within the same parent container.';
        setText(concatenatedString);
      }
      if(item==':last-child') 
      {
        const label=`"`+item+`"`+': :last-child Pseudo-Class';
        setName(label);
        const concatenatedString='Matches an element that is the last child of its parent. It selects elements that have no succeeding siblings within the same parent container.';
        setText(concatenatedString);
      }
      if(item==':nth-child(even)')
      {
        const label=`"`+item+`"`+': :nth-child(even) Pseudo-Class';
        setName(label);
        const concatenatedString='Matches elements that are at even positions among their siblings within the same parent container. The counting starts from 1.';
        setText(concatenatedString);
      }
      if(item==':nth-child(odd)')
      {
        const label=`"`+item+`"`+': :nth-child(odd) Pseudo-Class';
        setName(label);
        const concatenatedString='Matches elements that are at odd positions among their siblings within the same parent container. The counting starts from 1';
        setText(concatenatedString);
      }
      if(item==':active')
      {
        const label=`"`+item+`"`+': :active Pseudo-Class';
        setName(label);
        const concatenatedString='Matches an element that is currently being activated or interacted with. It is often used for styling elements during user interaction.';
        setText(concatenatedString);
      }
      if(item==':checked')
      {
        const label=`"`+item+`"`+': :checked Pseudo-Class';
        setName(label);
        const concatenatedString='Matches a user-interface element that is selected or checked, typically used with checkboxes or radio buttons.';
        setText(concatenatedString);
      }
      if(item==':visited')
      {
        const label=`"`+item+`"`+': :visited Pseudo-Class';
        setName(label); 
        const concatenatedString='Matches a link that has been visited by the user. It is used for styling visited links differently from unvisited ones.';
        setText(concatenatedString);

      }
      if(item==':hover')
      {
        const label=`"`+item+`"`+': :hover Pseudo-Class';
        setName(label); 
        const concatenatedString='Matches an element when the user hovers over it with the mouse. It is commonly used for providing visual feedback during mouse interaction.';
        setText(concatenatedString);
      }
    }
     if(pseudoElements.includes(item))
     {
        if(item=='::before')
        {
          const label=`"`+item+`"`+': ::before Pseudo-Element';
          setName(label); 
          const concatenatedString='Matches a virtual element that is inserted before the content of the selected element. It allows for the creation of additional content or decorative elements before the actual content of the element.';
          setText(concatenatedString);
        }
        if(item=='::after')
        {
          const label=`"`+item+`"`+': ::after Pseudo-Element';
          setName(label); 
          const concatenatedString='Matches a virtual element that is inserted after the content of the selected element. Similar to ::before, it is often used to add decorative or informational content after the actual content of the element.';
          setText(concatenatedString);
        }
        if(item=='::first-letter')
        {
          const label=`"`+item+`"`+': ::first-letter Pseudo-Element';
          setName(label); 
          const concatenatedString='Matches the first letter of the content within the specified element. It enables styling that specifically targets and modifies the appearance of the initial letter, such as changing its font size, color, or applying other text-related properties.';
          setText(concatenatedString);
        }
        if(item=='::first-line')
        {
          const label=`"`+item+`"`+': ::first-line Pseudo-Element';
          setName(label); 
          const concatenatedString=' Matches the first line of the content within the specified element. It allows for unique styling of the initial line of text, making it possible to set different margins, font properties, or other styles specifically for the first line.';
          setText(concatenatedString);
        }      
    }
    if (/^[.]/.test(item)) 
    {
        if(names.includes(item.slice(1)))
        {
          const label=`"`+item+`"`+':  Class selector';
          setName(label); 
          const concatenatedString='matches an element based on the value of the elements class attribute. In order for the element to be selected, its class attribute must match exactly the value given in the selector.';
          setText(concatenatedString);
        }
    } 
    if (/^[#]/.test(item)) {
        if(names.includes(item.slice(1)))
      {
        const label=`"`+item+`"`+':  Id selector';
        setName(label); 
        const concatenatedString='matches an element based on the value of the elements id attribute. In order for the element to be selected, its id attribute must match exactly the value given in the selector.';
        setText(concatenatedString);
      }
    }
    if(item===' + '){
        const label=`"`+item+`"`+': Next-sibling combinator';
        setName(label); 
        const concatenatedString='Matches an element that is immediately preceded by a sibling element. It includes elements that share the same parent and come right after the specified sibling.';
        setText(concatenatedString);
      }
      if(item===' > '){
        const label=`"`+item+`"`+': child combinator';
        setName(label); 
        const concatenatedString='Matches all direct children of a specified element. It includes elements that are immediate descendants of the specified parent.';
        setText(concatenatedString);
      }
      if(item==='  '){
        const label=`"`+item+`"`+':  Descendant combinator';
        setName(label); 
        const concatenatedString='Matches all descendants of a specified element. It includes elements at any level of nesting within the given context';
       setText(concatenatedString);
      }
      if(item===' ~ '){
        const label=`"`+item+`"`+': Subsequent-sibling combinator ';
        setName(label); 
        const concatenatedString='Matches all siblings that come after a specified element. It includes elements that share the same parent and follow the specified element in the document structure.';
      setText(concatenatedString);
      }
    
  };
    return (
    <>
    <div className="container">
      <h1><strong>CSS Quiz</strong></h1>
      <div className="quiz-area">
          <div className="randomize-button">
          <h2 className="title-specificity">Specificity</h2>
          <br/><br/>
          <p className="question-specificity">Guess the specificity of the following selector.</p>
          <button className="button" onClick={handleRandomizeClick}>Randomize!</button>
          <div className="generated-selector">
            {selector.map((item, index) => (
              <p key={index} onClick={() => handleElementClick(item)}>{item}</p>))}
          </div>
          </div>
          <div className="input-weights">
          <input className={`id-weight ${id ? (id === specWeight[0] ? 'id-match' : 'id-mismatch') : ''}`} type="number" value={id} onChange={handleIdinputChange} />
          <input className={`class-weight ${sclass? (sclass === specWeight[1] ? 'class-match' : 'class-mismatch') : ''}`} type="number" value={sclass} onChange={handleClassinputChange} />
          <input className={`type-weight ${type? (type === specWeight[2] ? 'type-match' : 'type-mismatch') : ''}`} type="number" value={type} onChange={handleTypeinputChange} />
          </div>
      </div>
      <div className="description-area">
        <h5>{name}</h5>
        <p>{text}</p>
      </div>
    </div>
    </>
  )
}

export default App
