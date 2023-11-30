
class Observer {
    update(): void {

    }
}


class Subject {
    private observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update();
        }
    }
}


class TextObserver extends Observer {
    private text: string = "";

    setText(text: string): void {
        this.text = text;
    }

    update(): void {
        console.log(`Conteúdo atualizado: ${this.text}`);
    }
}


class TextEditor extends Subject {
    private lines: string[] = [];

    insertLine(lineNumber: number, text: string): void {
        if (lineNumber < 0 || lineNumber > this.lines.length) {
            console.log("Número de linha inválido.");
            return;
        }

        this.lines.splice(lineNumber, 0, text);
        this.notify();
    }

    removeLine(lineNumber: number): void {
        if (lineNumber < 0 || lineNumber >= this.lines.length) {
            console.log("Número de linha inválido.");
            return;
        }

        this.lines.splice(lineNumber, 1);
        this.notify();
    }

    saveToFile(): void {
        console.log("Conteúdo salvo no arquivo.");
    }

    displayContent(): void {
        console.log("Conteúdo do editor:");
        console.log(this.lines.join("\n"));
    }

    getUserInput(): void {
        const userInput: string[] = [];

        console.log("Digite as linhas de texto. Digite 'EOF' para encerrar:");

        let input: string;
        while ((input = prompt("Digite uma linha de texto:")) !== "EOF") {
            userInput.push(input);
        }

        this.lines = userInput;
        this.notify();
    }
}

const textObserver = new TextObserver();
const textEditor = new TextEditor();

textEditor.addObserver(textObserver);

textEditor.notify();

textEditor.getUserInput();

textEditor.saveToFile();

textEditor.displayContent();
