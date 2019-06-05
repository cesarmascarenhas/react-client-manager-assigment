import React from 'react';
import { Header } from './';
import renderer from 'react-test-renderer';

test("Test Logged output",()=>{
    let component = renderer.create(<Header user={false} />);
    expect(component.toJSON().children).toBeNull();
    component = renderer.create(<Header user={true} />,);
    expect(component.toJSON().children).not.toBeNull();
})