import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import { DisplayControl } from "./control.display";
import { DisplayControlProps } from "./control.display.props";
import { DisplayControlClassNameContract } from "./control.display.style";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const managedClasses: DisplayControlClassNameContract = {
    displayControl: "displayControl",
    displayControl__disabled: "displayControl__disabled",
};

const displayProps: DisplayControlProps = {
    dataLocation: "",
    value: "",
    disabled: false,
    reportValidity: jest.fn(),
    updateValidity: jest.fn(),
    onChange: jest.fn(),
    elementRef: null,
};

describe("DisplayControl", () => {
    test("should not throw", () => {
        expect(() => {
            shallow(<DisplayControl {...displayProps} managedClasses={managedClasses} />);
        }).not.toThrow();
    });
    test("should generate an HTML input element", () => {
        const rendered: any = mount(
            <DisplayControl {...displayProps} managedClasses={managedClasses} />
        );

        expect(rendered.find("input")).toHaveLength(1);
    });
    test("should be disabled when disabled props is passed", () => {
        const rendered: any = mount(
            <DisplayControl
                {...displayProps}
                disabled={true}
                managedClasses={managedClasses}
            />
        );

        expect(rendered.find(`.${managedClasses.displayControl__disabled}`)).toHaveLength(
            1
        );
        expect(rendered.find("input").prop("disabled")).toBeTruthy();
    });
    test("should show default values if they exist and no data is available", () => {
        const defaultValue: string = "bar";
        const rendered: any = mount(
            <DisplayControl
                {...displayProps}
                managedClasses={managedClasses}
                value={undefined}
                default={defaultValue}
            />
        );

        expect(rendered.find(`.${managedClasses.displayControl}`).prop("value")).toBe(
            defaultValue
        );
    });
    test("should show non-string default values if they exist and no data is available", () => {
        const defaultValue: number = 50;
        const rendered: any = mount(
            <DisplayControl
                {...displayProps}
                managedClasses={managedClasses}
                value={undefined}
                default={defaultValue}
            />
        );

        expect(rendered.find(`.${managedClasses.displayControl}`).prop("value")).toBe(
            JSON.stringify(defaultValue, null, 2)
        );
    });
    test("should not show default values if data exists", () => {
        const value: string = "foo";
        const defaultValue: string = "bar";
        const rendered: any = mount(
            <DisplayControl
                {...displayProps}
                managedClasses={managedClasses}
                value={value}
                default={defaultValue}
            />
        );
        expect(rendered.find(`.${managedClasses.displayControl}`).prop("value")).toBe(
            value
        );
    });
    test("should NOT fire an onChange when the input value is updated", () => {
        const callback: any = jest.fn();
        const rendered: any = mount(
            <DisplayControl
                {...displayProps}
                onChange={callback}
                managedClasses={managedClasses}
            />
        );

        rendered.find("input").simulate("change", { target: { value: "foo" } });

        expect(callback).toHaveBeenCalledTimes(0);
    });
});
