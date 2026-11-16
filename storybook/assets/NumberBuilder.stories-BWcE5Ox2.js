import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,r as n}from"./svg-C0_Y8l-t.js";function r({value:e,title:t,color:r,background:i,...a}){let o=document.createElement(`div`);o.style.color=`#24292f`;try{o.innerHTML=n(e,{...a,...r?{color:r}:{},...i?{background:i}:{},...t?{title:t}:{}})}catch(e){o.setAttribute(`role`,`alert`),o.style.color=`#c92a2a`,o.style.fontFamily=`system-ui, sans-serif`,o.textContent=e.message}return o}var i,a,o,s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{t(),i={title:`Counting Rods/Number Builder`,render:r,args:{value:`1993`,size:160,gap:18,padding:20,zero:`circle`,traditionalColors:!1,color:``,background:``,title:``},argTypes:{value:{control:`text`,description:`Any decimal number: whole, fractional, negative or very large. Passed as a string so every digit is kept.`},size:{control:{type:`range`,min:24,max:480,step:4},description:`Image height in pixels.`},gap:{control:{type:`range`,min:0,max:80,step:2}},padding:{control:{type:`range`,min:0,max:40,step:1}},zero:{control:`inline-radio`,options:[`circle`,`blank`],description:"`circle` draws zero as 〇. `blank` leaves the place empty, as the earliest rod numerals did."},traditionalColors:{control:`boolean`,description:"Red rods for positive numbers and black for negative, as on a counting board. Replaces `currentColor`, but not a colour you pass."},color:{control:`text`,description:"A CSS colour, or a gradient: `linear-gradient(to right, red, blue)`, `radial-gradient(…)` or their `repeating-` forms. Empty for currentColor."},background:{control:`text`,description:`A colour or a gradient, as for **color**. Empty for transparent.`},title:{control:`text`,description:`Accessible name. Leave empty to use the number.`}},parameters:{docs:{description:{component:"Type any number in the **value** control and adjust the style. Every control maps to a `toSvg` option."}}}},a={},o={args:{value:`1234567890`},parameters:{docs:{description:{story:`Places alternate between upright and flat rods.`}}}},s={args:{value:`3.14159`},parameters:{docs:{description:{story:`A dot on the baseline marks the decimal point.`}}}},c={args:{value:`-42`},parameters:{docs:{description:{story:`A diagonal rod across the last digit.`}}}},l={args:{value:`-42`,traditionalColors:!0},parameters:{docs:{description:{story:`Red rods for positive numbers, black for negative.`}}}},u={args:{value:`1005`,zero:`blank`},parameters:{docs:{description:{story:`The earliest rod numerals left zero places empty.`}}}},d={args:{value:`1234567`,color:`linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)`}},f={args:{value:`2026.1225`,color:`repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)`,background:`radial-gradient(#2b8a3e, #0b3d20)`}},p={args:{value:`twelve`},parameters:{docs:{description:{story:`Input that isn't a decimal number shows the error.`}}}},m=[`Playground`,`LargeNumber`,`Decimal`,`Negative`,`Traditional`,`BlankZero`,`Rainbow`,`Christmas`,`InvalidInput`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1234567890'
  },
  parameters: {
    docs: {
      description: {
        story: 'Places alternate between upright and flat rods.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: '3.14159'
  },
  parameters: {
    docs: {
      description: {
        story: 'A dot on the baseline marks the decimal point.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: '-42'
  },
  parameters: {
    docs: {
      description: {
        story: 'A diagonal rod across the last digit.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: '-42',
    traditionalColors: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Red rods for positive numbers, black for negative.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1005',
    zero: 'blank'
  },
  parameters: {
    docs: {
      description: {
        story: 'The earliest rod numerals left zero places empty.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1234567',
    color: 'linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026.1225',
    color: 'repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)',
    background: 'radial-gradient(#2b8a3e, #0b3d20)'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'twelve'
  },
  parameters: {
    docs: {
      description: {
        story: "Input that isn't a decimal number shows the error."
      }
    }
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{u as BlankZero,f as Christmas,s as Decimal,p as InvalidInput,o as LargeNumber,c as Negative,a as Playground,d as Rainbow,l as Traditional,m as __namedExportsOrder,i as default};