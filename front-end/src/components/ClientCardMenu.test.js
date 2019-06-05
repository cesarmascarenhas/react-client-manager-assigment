import React from 'react';
import { ClientCardMenu } from './';
import renderer from 'react-test-renderer';

test("Test user role options",()=>{
    //ADMIN
    let component = renderer.create(<ClientCardMenu permission="9" />);
    expect(component.toJSON().children[1].children[1]).not.toBeNull();
    //USER
    component = renderer.create(<ClientCardMenu permission="5" />);
    expect(component.toJSON().children[1].children[1].children.length).toBe(1);
    //NOOB
    component = renderer.create(<ClientCardMenu permission="1" />);
    expect(component.toJSON().children[1].children[1].children).toBeNull();
})