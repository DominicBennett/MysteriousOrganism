// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


//Factory function to create an instance of 'pAequor'
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      //select an element at random from dna
      let randomBase = this.dna[Math.floor(Math.random() * this.dna.length)];
      console.log('random base' + randomBase);
      let bases = ['A', 'T', 'C', 'G'];
      //exclude randomBase from the array of valid bases
      let validBases = bases.filter(item => item != randomBase);
      //console.log('Valid Bases ' + validBases);
      //randomly select one base as a "mutation"
      let mutatedBase = validBases[Math.floor(Math.random() * (validBases.length))];
      //console.log('Mutated base is ' + mutatedBase);
      console.log('index of randomBase is ' + this.dna.indexOf(randomBase));
      //console.log('index of mutated base is ' + validBases.indexOf(mutatedBase));
      //insert the mutatedBase into dna
      this.dna[this.dna.indexOf(randomBase)] = mutatedBase;
      return this.dna;
    },
    compareDNA(pAqueor) {
      let counter = 0;
      for (let i = 0; i < 15; i++) {
        if (pAqueor.dna[i] === this.dna[i]) {
          counter++;
        }
      }
      console.log(`DNA of specimen ${this.specimenNum} and specimen ${pAqueor.specimenNum} share ${counter} bases (${counter * 6.66}%).`);
      return counter;
    },
    willLikelySurvive() {
      let counter = 0;
      for (let i = 0; i < 15; i++) {
        if ((this.dna[i] === 'C') || (this.dna[i] === 'G')) {
          counter++;
        }
      }
      if (counter * 6.66 >= 60) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      let complement = [];
      for (i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            complement.push('T');
            break;
          case 'T':
            complement.push('A');
            break;
          case 'C':
            complement.push('G');
            break;
          case 'G':
            complement.push('C');
            break;
          default:
            console.log('Invalid base!');
        }
      }
      return complement;
    }
  }
}

//test the methods in 'pAequorFactory'
console.log(pAequorFactory(1, mockUpStrand()));
let sample = (pAequorFactory(1, mockUpStrand()));
console.log('unmutated : ' + sample.dna.join(''));
console.log(sample.mutate().join(''));
console.log(sample.dna.join(''));
let sample2 = (pAequorFactory(2, mockUpStrand()));
console.log('s1 = ' + sample.dna.join(''));
console.log('s2 = ' + sample2.dna.join(''));
sample.compareDNA(sample2);
sample.compareDNA(sample);
console.log(sample.willLikelySurvive());

//create an empty array to hold samples, then populate it with
//samples which return true for 'willLikelySurvive()'
let sampleArray = [];
console.log('sample array length = ' + sampleArray.length);

for (i = 0; i < 30; i++) {
  let mySample = pAequorFactory(i + 1, mockUpStrand());
  do {
    mySample = pAequorFactory(i + 1, mockUpStrand());
  } while (mySample.willLikelySurvive() === false);
  sampleArray.push(mySample);
};

// Log the array of created samples along with result of a
//call to their 'willLikelySurvive()' method to check they
//are all viable
for (item of sampleArray) {
  console.log('sample ' + item.specimenNum + ' ' + item.dna.join('') + ' (sample will survive = ' + item.willLikelySurvive() + ')');
};

console.log('sample array length = ' + sampleArray.length);
console.log(`Sample array index 0 normal = ${sampleArray[0].dna}`);
console.log(`Sample array index 0 comple = ${sampleArray[0].complementStrand()}`);

console.log('***************');


//initialise variables used to determine most similar specimen pairs
let sameBases = 0;
let maxSameBases = 0;
let mostSimilarSpecimenPairs =[];

//iterate through specimen array to compare each sample with every other sample
//add most similar sample pairs to an array
for (let i = 0; i < sampleArray.length; i++) {
  for (let j = i + 1; j < sampleArray.length; j++) {
    sameBases = sampleArray[i].compareDNA(sampleArray[j]);
    if (sameBases > maxSameBases) {
      maxSameBases = sameBases;
      mostSimilarSpecimenPairs = [];
      mostSimilarSpecimenPairs.push([sampleArray[i].specimenNum, sampleArray[j].specimenNum]);
    }
    else if (sameBases >= maxSameBases) {
      mostSimilarSpecimenPairs.push([sampleArray[i].specimenNum, sampleArray[j].specimenNum]);
    }
  }
}
//output results
console.log('maximum bases in common between any 2 specimens is ' + maxSameBases);
console.log('Most similar specimen pairs are: ');
console.log(mostSimilarSpecimenPairs);




