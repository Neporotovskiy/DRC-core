import { aligner } from './aligner.js';
import { sequencer } from './sequencer.js';
import { linker } from './linker.js';
import { grouper } from './grouper.js';

/*
BLUEPRINTS SET EXAMPLE

[
    {
        length: 5500,
        edges: [0, 0], // right, left
        milestones: { // right to left
            468: [1, 1], // top, bottom
            4768: [1, 1],
        },
        mark: 57,
        number: 6,
        notes: null,
    },
]
*/

/*
USAGE EXAMPLE

new DelmaResourceCalculator(blueprints)
    .setLogger(({ step, status, name, error }) => console.log(step, status, name, error))
    .setAssetLength(6000)
    .setCuttingEdgeWidth(1)
    .setCalculationAccuracy(1)
    .calculate(data => {
        // Do something with recevied data
    })
    .analyze(data => {
        // Do something with recevied data
    });
*/

/**
 * Delma Resource Calculator
 */
export class DelmaResourceCalculator {
    constructor(data) {
        this.data = data;
        this.output = null;
        this.logger = () => {};
    }

    setLogger(callback) {
        this.logger = callback;
        return this;
    }

    setAssetLength(assetLength) {
        this.assetLength = assetLength;
        this.logger({ step: 1, status: 1 });
        return this;
    }

    setCuttingEdgeWidth(cuttingEdge) {
        this.cuttingEdge = cuttingEdge;
        this.logger({ step: 2, status: 1 });
        return this;
    }

    setCalculationAccuracy(calculationAccuracy) {
        this.calculationAccuracy = calculationAccuracy;
        this.logger({ step: 3, status: 1 });
        return this;
    }

    calculate(callback) {
        try {
            const { err: alignerError, result: alignedData } = aligner(this.data);
            if (alignerError) {
                this.logger({ step: 4, status: 0, error: alignerError });
                return this;
            } else {
                this.logger({ step: 4, status: 1 });
            }
            const { err: sequencerError, result: separatedSequences } = sequencer(alignedData, {
                assetLength: this.assetLength,
                cuttingEdge: this.cuttingEdge,
                calculationAccuracy: this.calculationAccuracy,
            });
            if (sequencerError) {
                this.logger({
                    step: 5,
                    status: 0,
                    error: sequencerError,
                });
                return this;
            } else {
                this.logger({ step: 5, status: 1 });
            }
            const { err: grouperError, result: groupedSequences } = grouper(separatedSequences);
            if (grouperError) {
                this.logger({
                    step: 6,
                    status: 0,
                    error: grouperError,
                });
                return this;
            } else {
                this.logger({ step: 6, status: 1 });
            }
            const { err: linkerError, result: output } = linker(groupedSequences, this.data);
            if (linkerError) {
                this.logger({
                    step: 7,
                    status: 0,
                    error: linkerError,
                });
                return this;
            } else {
                this.logger({ step: 7, status: 1 });
            }
            this.output = output;
            callback(output);
            this.logger({ step: 8, status: 1 });
        } catch (error) {
            this.output = null;
            this.logger({ step: 8, status: 0, error });
        }
        return this;
    }

    analyze(callback) {
        if (this.output === null) return this;
        try {
            let totalConsumption = null;
            let totalWaste = null;
            try {
                this.logger({ step: 9, status: 1 });
                totalConsumption = this.output.reduce(
                    (previousValue, currentValue) => previousValue + currentValue.number,
                    0,
                );
                totalWaste = this.output.reduce((previousValue, currentValue) => {
                    const { group } = currentValue;
                    const groupConsumption = group.reduce(
                        (previousValue, currentValue) => previousValue + currentValue.length,
                        0,
                    );
                    return previousValue + (this.assetLength - groupConsumption - (group.length - this.cuttingEdge));
                }, 0);
            } catch (err) {
                this.logger({ step: 9, status: 0, error: err });
            }
            callback({
                totalConsumption,
                totalWaste,
            });
            this.logger({ step: 10, status: 1 });
        } catch (error) {
            this.logger({ step: 10, status: 0, error });
        }
        return this;
    }
}
