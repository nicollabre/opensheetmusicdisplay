import {Label} from "../Label";
import {GraphicalLabel} from "./GraphicalLabel";
import {ChordSymbolContainer} from "../VoiceData/ChordSymbolContainer";
import {BoundingBox} from "./BoundingBox";
import {GraphicalObject} from "./GraphicalObject";
import {PointF2D} from "../../Common/DataObjects/PointF2D";
import {EngravingRules} from "./EngravingRules";
import { KeyInstruction } from "../VoiceData/Instructions/KeyInstruction";

export class GraphicalChordSymbolContainer extends GraphicalObject {
    private chordSymbolContainer: ChordSymbolContainer;
    private graphicalLabel: GraphicalLabel;

    constructor(chordSymbolContainer: ChordSymbolContainer, parent: BoundingBox, textHeight: number,
                keyInstruction: KeyInstruction, transposeHalftones: number, rules: EngravingRules) {
        super();
        this.chordSymbolContainer = chordSymbolContainer;
        this.boundingBox = new BoundingBox(this, parent);
        this.calculateLabel(textHeight, transposeHalftones, keyInstruction, rules);
    }
    public get GetChordSymbolContainer(): ChordSymbolContainer {
        return this.chordSymbolContainer;
    }
    public get GetGraphicalLabel(): GraphicalLabel {
        return this.graphicalLabel;
    }
    private calculateLabel(textHeight: number, transposeHalftones: number, keyInstruction: KeyInstruction, rules: EngravingRules): void {
        const text: string = ChordSymbolContainer.calculateChordText(this.chordSymbolContainer,
                                                                     transposeHalftones,
                                                                     keyInstruction,
                                                                     rules.RenderChordDegreeText);
        this.graphicalLabel = new GraphicalLabel(new Label(text), textHeight, rules.ChordLabelPosition, rules, this.boundingBox);
        this.graphicalLabel.PositionAndShape.RelativePosition = new PointF2D(0.0, 0.0);
    }
}
