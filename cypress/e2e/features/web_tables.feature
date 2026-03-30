# language: pt
Funcionalidade: Gerenciamento de Web Tables

  Cenário: Criação e Exclusão em Massa de Registros
    Dado que estou na página de Web Tables
    Quando eu cadastro e deleto os seguintes usuários:
      | firstName | lastName | userEmail           | age | salary | department |
      | Alan      | Turing   | alan@enigma.com     | 41  | 10000  | Cryptography|
      | Ada       | Lovelace | ada@analytical.com  | 36  | 12000  | Algorithm   |
      | Grace     | Hopper   | grace@cobol.com     | 85  | 11000  | Compiler    |
      | Linus     | Torvalds | linus@linux.org     | 54  | 15000  | Kernel      |
      | Margaret  | Hamilton | maggie@apollo.com   | 87  | 14000  | Apollo 11   |
      | Steve     | Wozniak  | woz@apple.com       | 73  | 13000  | Hardware    |
      | Tim       | Berners  | tim@www.com         | 68  | 9000   | Web         |
      | Claude    | Shannon  | claude@info.com     | 84  | 9500   | Information |
      | John      | Neumann  | john@architecture.com| 53  | 10500  | EDVAC       |
      | Barbara   | Liskov   | barbara@mit.edu     | 84  | 11500  | Substitution|
      | Guido     | Rossum   | guido@python.org    | 68  | 12500  | Python      |
      | Ken       | Thompson | ken@unix.com        | 81  | 13500  | B Language  |
    Então todos esses registros devem ser removidos da tabela