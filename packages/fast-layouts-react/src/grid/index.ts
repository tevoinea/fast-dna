import React from "react";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import {
    Grid as BaseGrid,
    GridAlignment,
    GridClassNamesContract,
    GridDisplay,
    GridGutter,
    GridHandledProps as BaseGridHandledProps,
    GridManagedClasses,
    GridProps as BaseGridProps,
    GridTag,
    GridUnhandledProps,
} from "./grid";
import { Subtract } from "utility-types";

/* tslint:disable-next-line:typedef */
const Grid = manageJss()(BaseGrid);
type Grid = typeof Grid;

interface GridHandledProps extends Subtract<BaseGridHandledProps, GridManagedClasses> {}
type GridProps = ManagedJSSProps<BaseGridProps, GridClassNamesContract, undefined>;

export {
    Grid,
    GridProps,
    GridHandledProps,
    GridUnhandledProps,
    GridClassNamesContract,
    GridTag,
    GridAlignment,
    GridGutter,
    GridDisplay,
};
