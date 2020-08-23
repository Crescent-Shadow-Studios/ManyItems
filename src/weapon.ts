import {Attack} from './attack';
import { Mod } from './mod';
import {Random} from './random';

export class Weapon {
    name: string;

    mainAttack: Attack;
    attackParams: object;
    attacks: Array<Attack>;

    stats: object;

    meta: object;



    constructor (name: string, mainAttack?: Attack | null, attackParams?: AttackParams, attacks?: Array<Attack> | Attack | null, metaInfo?: MetaInfo, stats?: Stats) {
        this.name = name;
        if (mainAttack) {this.setMainAttack(mainAttack);} else {this.mainAttack = null;}
        if (attackParams) {this.attackParams = Weapon.verifyAttackParams(attackParams, this, true);} else {this.attackParams = null;}

        this.verifyAttacks(mainAttack, attacks);

        if (metaInfo) {this.meta = Weapon.verifyMetaInfo(metaInfo, this, true);} else {this.meta = null;}
    };



    public setMainAttack(attack: Attack | null): Weapon {
        if (!(attack instanceof Attack) && attack !== null) {console.log(attack); throw new SyntaxError("Weapon param 'mainAttack' must be an instance of class 'Attack'");}
        this.verifyAttacks(attack, this.attacks);
        this.mainAttack = attack;
        return this;
    };

    public setMetaInfo(meta: MetaInfo): Weapon {
        this.meta = meta;
        return this;
    }; public setMeta(meta: MetaInfo): Weapon {
        return this.setMetaInfo(meta);
    };

    public setAttackParams(params: AttackParams): Weapon {
        this.attackParams = params;
        return this;
    };

    public setAttacks(attacks: Array<Attack> | Attack | null): Weapon {
        this.attacks = this.verifyAttacks(this.mainAttack, attacks);
        return this;
    };



    public addAttack(attack: Attack): Weapon {
        this.verifyAttacks(this.mainAttack, this.attacks).push(attack);
        return this;
    };



    public editStats(newStats: Stats, clearOld?: boolean): Weapon {
        return this;
    };



    private static verifyAttackParams(params: object, w: Weapon, full?: boolean): object {
        if (full) {
            function verify (obj: object): obj is AttackParams {return 'canAttack' in obj;}
            if (verify(params)) {w.attackParams = params;} else {throw new SyntaxError("Invalid 'attackParams' given.");}
        }

        return params;
    };

    private static verifyMetaInfo(params: object, w: Weapon, full?: boolean): object {
        if (full) {
            function verify (obj: object): obj is MetaInfo {return 'author' in obj || 'rarity' in obj;}
            if (verify(params)) {w.meta = params;} else {throw new SyntaxError("Invalid 'metaInfo' given.");}
        }

        return params;
    };

    private verifyAttacks(mainAttack: Attack | null, attacks: Array<Attack> | Attack | null): Array<Attack> {
        if (mainAttack === null && attacks) {throw new SyntaxError("Attack(s) given in Weapon constructor or setAttacks(), but no Main Attack is set. Make sure you designate a main attack in constructor or use setMainAttack().");}
        if (attacks && mainAttack) {
            if (Array.isArray(attacks)) {if (!attacks.includes(mainAttack)) {
                attacks.push(mainAttack);
                this.attacks = attacks;
            }} else {this.attacks = [mainAttack, attacks];}
        } else if (!attacks && mainAttack) {this.attacks = [mainAttack];}
        else {this.attackParams = {canAttack: false};}
        if (attacks instanceof Attack && !Array.isArray(attacks)) {this.attacks = [attacks];}

        return this.attacks;
    };



    get metaInfo(): object {return this.meta};

}

type Effects = string | Array<string> | null;

interface Effects_Obj {
    victim?: Effects,
    target?: Effects,

    caster?: Effects,
    user?: Effects,
    holder?: Effects,

    all?: Effects
}

interface AttackParams {
    canAttack: boolean,
    durability?: number | boolean,
    durabilityMode?: "percent" | "default" | "heap" | "state",
    maxRange?: number,
    statuses?: Effects | Effects_Obj,
    custom?: object
}

interface MetaInfo {
    author?: string,
    rarity?: string
}

interface Stats {
    isBroken?: true,
    custom?: object
}

/*let sword = new Weapon("Sword")
.setMainAttack(new Attack("Stab", null))
.setAttackParams({canAttack: true, durability: true, maxRange: 20, statuses: "bleeding"})
.setMeta({author: "WubzyGD", rarity: "Common"});

console.log(sword);*/