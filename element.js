class Element{
    #position = new THREE.Vector3(0,0,0);
    #velocity = new THREE.Vector3(0,0,0);
    #acceleration = new THREE.Vector3(0,0,0);
    constructor(mass,geometry){
        this.mass = mass;
        this.geometry = geometry;
    }
    setPosition(x,y,z){
        this.#position.set(x,y,z);
    }
    setVelocity(x,y,z){
        this.#velocity.set(x,y,z);
    }
    setAcceleration(x,y,z){
        this.#acceleration.set(x,y,z);
    }
    getPosition(){
        return this.#position;
    }
    getVelocity(){
        return this.#velocity;
    }
    getAcceleration(){
        return this.#acceleration;
    }
    
    update(){
        const maxPos = 10;
        this.#position.add(this.#velocity);
        if(this.#position.x > maxPos){
            this.#position.x = maxPos;
            this.#velocity.x = 0;
            this.#acceleration.x = 0;
        }
        if(this.#position.x < -maxPos){
            this.#position.x = -maxPos;
            this.#velocity.x = 0;
            this.#acceleration.x = 0;
        }
        if(this.#position.y > maxPos){
            this.#position.y = maxPos;
            this.#velocity.y = 0;
            this.#acceleration.y = 0;
        }
        if(this.#position.y < -maxPos){
            this.#position.y = -maxPos;
            this.#velocity.y = 0;
            this.#acceleration.y = 0;
        }
        if(this.#position.z > maxPos){
            this.#position.z = maxPos;
            this.#velocity.z = 0;
            this.#acceleration.z = 0;
        }
        if(this.#position.z < -maxPos){
            this.#position.z = -maxPos;
            this.#velocity.z = 0;
            this.#acceleration.z = 0;
        }


        this.#velocity.add(this.#acceleration);
        this.geometry.position.set(this.#position.x,this.#position.y,this.#position.z);
    }

}