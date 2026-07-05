import {
  InstagramLogoIcon,
  PhoneIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
// import CarrinhoDrawer from "../../components/carrinho/CarrinhoDrawer";

export default function Cardapio() {
  return (
    <>
      {/* HEADER */}
      <div className="bg-[#171210] h-[120px] flex justify-between items-center w-full px-22 mx-auto border-b-1 border-[#FBE9BC]">
        <div>
          <img src="./images/logo.png" alt="Logo" />
        </div>
        <div className="bg-[#FBE9BC] rounded-[5px] p-1">
          <ShoppingCartIcon size={29} />
        </div>
      </div>

      {/* MENU */}
      <div className="bg-[#171210] min-h-screen w-full px-22 mx-auto mt-10">
        {/* CATEGORIAS */}
        <div className="flex justify-start items-center font-oswald">
          <button className="bg-[#FBE9BC] rounded-[5px] w-[130px] h-[42px] text-[#171210] border-1 border-[#171210] font-bold px-7 mr-5">
            BURGUERS
          </button>
          <button className="bg-[#171210] rounded-[5px] w-[130px] h-[42px] text-[#FBE9BC] border-1 border-[#FBE9BC] font-bold mr-5">
            PORÇÕES
          </button>
          <button className="bg-[#171210] rounded-[5px] w-[130px] h-[42px] text-[#FBE9BC] border-1 border-[#FBE9BC] font-bold mr-5">
            BEBIDAS
          </button>
          <button className="bg-[#171210] rounded-[5px] w-[130px] h-[42px] text-[#FBE9BC] border-1 border-[#FBE9BC] font-bold mr-5">
            SOBREMESAS
          </button>
        </div>

        {/* ITENS */}
        <div className="my-10">
          <h2 className="text-[#F0C264] font-alfa text-2xl">BURGUER</h2>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 mt-5">
            {/* ITEM 1 */}
            <div className="flex gap-4">
              <img
                src="./images/burguer1.png"
                alt="Burguer"
                className="w-[300px] h-[240px] object-cover rounded-[5px]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-[#F3E9D2] font-alfa text-[20px]">
                    SMASH TRIPLO
                  </h3>
                  <p className="text-[#C4B49A] text-[17px] mt-1 font-inter">
                    Três finas e crostantes carnes amassadas na chapa, com
                    queijo cheddar, cebola roxa e molho especial no pão de
                    batata.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-[#E8A93D] font-medium font-inter text-[17px]">
                    R$ 32,50
                  </span>
                </div>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex gap-4">
              <img
                src="./images/burguer2.png"
                alt="Burguer"
                className="w-[300px] h-[240px] object-cover rounded-[5px]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-[#F3E9D2] font-alfa text-[20px]">
                    DUPLO DA CASA
                  </h3>
                  <p className="text-[#C4B49A] text-[17px] mt-1 font-inter">
                    Três finas e crostantes carnes amassadas na chapa, com
                    queijo cheddar, cebola roxa e molho especial no pão de
                    batata.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-[#E8A93D] font-medium font-inter text-[17px]">
                    R$ 32,50
                  </span>
                </div>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="flex gap-4">
              <img
                src="./images/burguer1.png"
                alt="Burguer"
                className="w-[300px] h-[240px] object-cover rounded-[5px]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-[#F3E9D2] font-alfa text-[20px]">
                    SMASH TRIPLO
                  </h3>
                  <p className="text-[#C4B49A] text-[17px] mt-1 font-inter">
                    Três finas e crostantes carnes amassadas na chapa, com
                    queijo cheddar, cebola roxa e molho especial no pão de
                    batata.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-[#E8A93D] font-medium font-inter text-[17px]">
                    R$ 32,50
                  </span>
                </div>
              </div>
            </div>

            {/* ITEM 4 */}
            <div className="flex gap-4">
              <img
                src="./images/burguer2.png"
                alt="Burguer"
                className="w-[300px] h-[240px] object-cover rounded-[5px]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-[#F3E9D2] font-alfa text-[20px]">
                    DUPLO DA CASA
                  </h3>
                  <p className="text-[#C4B49A] text-[17px] mt-1 font-inter">
                    Três finas e crostantes carnes amassadas na chapa, com
                    queijo cheddar, cebola roxa e molho especial no pão de
                    batata.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-[#E8A93D] font-medium font-inter text-[17px]">
                    R$ 32,50
                  </span>
                </div>
              </div>
            </div>

            {/* ITEM 5 */}
            <div className="flex gap-4">
              <img
                src="./images/burguer1.png"
                alt="Burguer"
                className="w-[300px] h-[240px] object-cover rounded-[5px]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-[#F3E9D2] font-alfa text-[20px]">
                    SMASH TRIPLO
                  </h3>
                  <p className="text-[#C4B49A] text-[17px] mt-1 font-inter">
                    Três finas e crostantes carnes amassadas na chapa, com
                    queijo cheddar, cebola roxa e molho especial no pão de
                    batata.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-[#E8A93D] font-medium font-inter text-[17px]">
                    R$ 32,50
                  </span>
                </div>
              </div>
            </div>

            {/* ITEM 6 */}
            <div className="flex gap-4">
              <img
                src="./images/burguer2.png"
                alt="Burguer"
                className="w-[300px] h-[240px] object-cover rounded-[5px]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-[#F3E9D2] font-alfa text-[20px]">
                    DUPLO DA CASA
                  </h3>
                  <p className="text-[#C4B49A] text-[17px] mt-1 font-inter">
                    Três finas e crostantes carnes amassadas na chapa, com
                    queijo cheddar, cebola roxa e molho especial no pão de
                    batata.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-[#E8A93D] font-medium font-inter text-[17px]">
                    R$ 32,50
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-[#171210] h-[100px] flex justify-end items-center w-full px-22 mx-auto border-t-1 border-[#FBE9BC] font-pacifico text-[#F0C264] text-[18px]">
        <div className="flex items-center justify-center mr-1">
          Siga-nos no Instagram &nbsp;&nbsp; <InstagramLogoIcon size={29} />
        </div>

        <div className="w-[2px] h-10 bg-[#F0C264] mx-3" />

        <div className="w-[154px] flex flex-wrap items-center">
          <span className="w-full text-center">Fale conosco</span>
          <span className="w-full flex items-center justify-center">
            <PhoneIcon size={29} className="mr-2" /> 14 99999-9999
          </span>
        </div>
      </div>

      {/* <CarrinhoDrawer /> */}
    </>
  );
}
