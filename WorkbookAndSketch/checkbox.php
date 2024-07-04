<!-- This is the index.php consider this the homepage for , below contains: https://codepen.io/cjonasw/embed/wvvKKJ?height=300&theme-id=39533&default-tab=result&slug-hash=wvvKKJ&pen-title=Multiselect%20(dropdown)&editable=true&user=cjonasw&name=cp_embed_4
 Nav Bar start  -->
<!Doctype Html>
<html>
	<center>
	<head>
	<title>checkbox</title>
	<center>
	<body>
<style>
	
    body{
        background: #666;
        color: white;
        font-size: 16px;
    }
    h1{
        border:5px solid;
  		border-block-start-style: groove
    }
    h1{
        border-color: coral;
        font-weight: lighter;
    }
        small{
            color: firebrick;
        }
        div.checkbox_select{
            inline-size: 200px;
        }
        .checkbox_select_anchor{
            display: block;
            background: firebrick;
            color: white;
            cursor: pointer;
            padding: 10px 5px 5px;
            position: relative;
        }
        .checkbox_select_anchor:after{
            inline-size: 0; 
            block-size: 0; 
            border-inline-start: 10px solid transparent;
            border-inline-end: 10px solid transparent;
            border-block-start: 10px solid darkred;
            content: "";
            position: absolute;
            inset-inline-end: 10px;
            inset-block-start: 15px;
        }
        .expanded .checkbox_select_anchor:after{
            border-block-start: 0;
            border-block-end: 10px solid firebrick;
        }
        .checkbox_select_anchor:hover{
            background: #FF3030 !important;
        }
        .expanded .checkbox_select_anchor{
            background: #7C1818;
        }
        div.checkbox_select .select_input{
            inline-size: 100%;
            cursor: pointer;
        }
        .checkbox_select_dropdown{
            display: none;
            background: whitesmoke;
        }
        .checkbox_select_dropdown.show{
            display: block;
        }
        .checkbox_select_dropdown ul{
            max-block-size: 150px;
            overflow-y: scroll;
            overflow-x: hidden;
            padding: 0;
            margin: 0;
            border: 1px solid #999;
            border-block-start: 0;
            border-block-end: 0;
        }
        .checkbox_select_dropdown ul li{
            list-style: none;
            position: relative;
            color: #666;
        }
        .checkbox_select_dropdown ul li label{
            position: relative;
            padding: 10px 5px 5px 40px;
            display: block;
            cursor: pointer;
        }
        .checkbox_select_dropdown ul li label:hover{
            background: #cbcbcb;
            color: white;
        }
        .checkbox_select_dropdown ul li input:checked + label{
            background: #bbb;
            color: white;
            text-shadow: 0px 1px 1px rgba(150, 150, 150, 1);
        }
        .checkbox_select_dropdown ul li input{
            position: absolute;
            inset-inline-start:0;
            z-index:1;
            display: inline-block;
            block-size: 100%;
            inline-size: 30px;
        }
        .checkbox_select_search{
            inline-size: 200px;
            padding: 10px 5px 5px;
            border: 1px solid #999;
            border-block-start: 0;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
        .checkbox_select_submit{
            background: #FF3030;
            color: white;
            padding: 10px 5px 5px;
            border: 0;
            inline-size: 100%;
            font-size: 14px;
            cursor: pointer;
        }
        .hide{
            display: none;
        }
        </style>
        </body>
        </center>
        </head>

</body>
</html>
<h1>Checkbox select</h1>

<form id="make_checkbox_select">

  <select name="make">
      <option data-count="2" value="Alfa Romeo">Alfa Romeo</option>
      <option data-count="23" value="Audi">Audi</option>
      <option data-count="433" value="BMW">BMW</option>
      <option data-count="45" value="Chrysler">Chrysler</option>
      <option data-count="476" value="Citroen">Citroen</option>
      <option data-count="78" value="Dodge">Dodge</option>
      <option data-count="123" value="Fiat">Fiat</option>
      <option data-count="32" value="Ford">Ford</option>
      <option data-count="3" value="Honda">Honda</option>
      <option data-count="342" value="Hyundai">Hyundai</option>
      <option data-count="45" value="Isuzu">Isuzu</option>
      <option data-count="653" value="Jaguar">Jaguar</option>
      <option data-count="3" value="Jeep">Jeep</option>
      <option data-count="23" value="Kia">Kia</option>
      <option data-count="5656" value="Lamborghini">Lamborghini</option>
      <option data-count="2133" value="Land Rover">Land Rover</option>
      <option data-count="2" value="Lexus">Lexus</option>
      <option data-count="43" value="Lotus">Lotus</option>
      <option data-count="54" value="Maserati">Maserati</option>
      <option data-count="5" value="Mazda">Mazda</option>
      <option data-count="1" value="Mercedes-Benz">Mercedes-Benz</option>
      <option data-count="34" value="Mini">Mini</option>
      <option data-count="23" value="Mitsubishi">Mitsubishi</option>
      <option data-count="56" value="Nissan">Nissan</option>
      <option data-count="98" value="Peugeot">Peugeot</option>
      <option data-count="210" value="Porsche">Porsche</option>
      <option data-count="3" value="Renault">Renault</option>
      <option data-count="76" value="Saab">Saab</option>
      <option data-count="45" value="Skoda">Skoda</option>
      <option data-count="3" value="smart">smart</option>
      <option data-count="23" value="Subaru">Subaru</option>
      <option data-count="7" value="Suzuki">Suzuki</option>
      <option data-count="45" value="Toyota">Toyota</option>
      <option data-count="23" value="Volkswagen">Volkswagen</option>
      <option data-count="6" value="Volvo">Volvo</option>
  </select>
  
  <input type="submit" />
  
</form>
<script>

	$(function()
	{
		var mySelectCheckbox = new checkbox_select(
		{
			selector : "#make_checkbox_select",
            selected_translation : "selectat",
            all_translation : "Toate marcile",
            not_found : "Nici unul gasit",

			// Event during initialization
			onApply : function(e)
			{
                alert("Custom Event: " + e.selected);
			}
		});
  
	});
		
</script>