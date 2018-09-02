// Get the modal
var modal = document.getElementById('myModal');
var container = document.getElementById('container');

// When the user clicks on the button, open the modal 
function showModal(message) 
{
    var modal_message = document.getElementById('modal_message');
    modal_message.innerHTML = message;
    modal.style.display = "block";
    container.setAttribute("style", "-webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px); -ms-filter: blur(5px); filter: blur(5px);");
}

// When the user clicks on <span> (x), close the modal
modal.onclick = function() {
    modal.style.display = "none";
    container.removeAttribute("style");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        container.removeAttribute("style");
    }
}

$(document).ready(function()
                  {
    var Node = {
        data : [[null, null, null],
                [null, null, null],
                [null, null, null]]
    };

    var ply = "X";
    var winner = null;
    var root = Node;
    var you_win_cntr = 0;
    var cpu_win_cntr = 0;
    var draws_cntr = 0;
    var level = 2;
    var AllowedTreeDeep = 2;

    function numOfEmpty(state)
    {
        var cntr = 0;

        for( var i = 0; i < 3; i++)
        {
            for( var j = 0; j < 3; j++)
            {
                if(state.data[i][j] == null)
                {
                    cntr++;
                }
            }
        }
        return cntr;
    }

    function numOfChance(state)
    {
        XChanceCntr = 0;
        OChanceCntr = 0;

        for( var i = 0; i < 3; i++)
        {
            if (state.data[i][0] != "O" && state.data[i][1] != "O" && state.data[i][2] != "O" ) 
            {
                XChanceCntr++;
            }
            if (state.data[0][i] != "O" && state.data[1][i] != "O" && state.data[2][i] != "O")
            {
                XChanceCntr++;  
            }
            if (state.data[i][0] != "X" && state.data[i][1] != "X" && state.data[i][2] != "X" ) 
            {
                OChanceCntr++;
            }
            if (state.data[0][i] != "X" && state.data[1][i] != "X" && state.data[2][i] != "X")
            {
                OChanceCntr++;  
            }
        }

        if(state.data[0][0] != "O" && state.data[1][1]  != "O" && state.data[2][2] != "O")
        {
            XChanceCntr++;  
        }
        if(state.data[0][2] != "O" && state.data[1][1]  != "O" && state.data[2][0] != "O")
        {
            XChanceCntr++;  
        }
        if(state.data[0][0] != "X" && state.data[1][1]  != "X" && state.data[2][2] != "X")
        {
            OChanceCntr++;  
        }
        if(state.data[0][2] != "X" && state.data[1][1]  != "X" && state.data[2][0] != "X")
        {
            OChanceCntr++;  
        }

        return XChanceCntr - OChanceCntr;
    }

    function isGoal(state)
    {
        for( var i = 0; i < 3; i++)
        {
            if ((state.data[i][0] == state.data[i][1] && state.data[i][0] == state.data[i][2] && state.data[i][0] == "X") || ( state.data[0][i] == state.data[1][i] && state.data[0][i] == state.data[2][i] && state.data[0][i] == "X"))
            {
                return "X";
            }
            if ((state.data[i][0] == state.data[i][1] && state.data[i][0] == state.data[i][2] && state.data[i][0] == "O") || ( state.data[0][i] == state.data[1][i] && state.data[0][i] == state.data[2][i] && state.data[0][i] == "O"))
            {
                return "O";
            }
        }

        if((state.data[0][0] == state.data[1][1] && state.data[0][0] == state.data[2][2] && state.data[0][0] == "X") || (state.data[0][2] == state.data[1][1] && state.data[0][2] == state.data[2][0] && state.data[0][2] == "X"))
        {
            return "X";
        }

        if((state.data[0][0] == state.data[1][1] && state.data[0][0] == state.data[2][2] && state.data[0][0] == "O") || (state.data[0][2] == state.data[1][1] && state.data[0][2] == state.data[2][0] && state.data[0][2] == "O"))
        {
            return "O";
        }

        for( var i = 0; i < 3; i++)
        {
            for( var j = 0; j < 3; j++)
            {
                if(state.data[i][j] == null)
                {
                    return null;
                }
            }
        }

        return "Draws";
    }

    function AITreeChildren(root, MinMax, deep)
    {
        if(deep > AllowedTreeDeep)
        {
            //alert(numOfChance(root));
            return numOfChance(root);

        }
        else if(isGoal(root) == "X")
        {
            return 9;
        }
        else if(isGoal(root) == "O")
        { 
            return -9;
        }
        else if(isGoal(root) == "Draws")
        { 
            return 0;
        }
        else if (MinMax == "min")
        {
            var min = Number.POSITIVE_INFINITY;

            for( var i = 0; i < 3; i++)
            {
                for( var j = 0; j < 3; j++)
                {
                    if (root.data[i][j] == null)
                    {
                        var child = Node;

                        child.data = root.data;

                        child.data[i][j] = "O";
                        var cost = AITreeChildren(child, "max", deep + 1);
                        child.data[i][j] = null;

                        if (cost < min)
                        {
                            min = cost;
                        }
                    }
                }
            }
            return min;
        }
        else if (MinMax == "max")
        {
            var max = Number.NEGATIVE_INFINITY;

            for( var i = 0; i < 3; i++)
            {
                for( var j = 0; j < 3; j++)
                {
                    if (root.data[i][j] == null)
                    {

                        var child = Node;

                        child.data = root.data;

                        child.data[i][j] = "X";
                        var cost = AITreeChildren(child, "min", deep + 1);
                        child.data[i][j] = null;

                        if (cost > max)
                        {
                            max = cost;
                        }
                    }
                }
            }
            return max;
        }
    }

    function AITree(root, deep)
    {
        var min = Number.POSITIVE_INFINITY;

        var x = 0;
        var y = 0;
        var i = 0;
        var j = 0;

        for(i = 0; i < 3; i++)
        {
            for(j = 0; j < 3; j++)
            {
                //alert(root.data[i][j]);

                if(root.data[i][j] == null)
                {
                    var child = Node;

                    child.data = root.data;

                    child.data[i][j] = "O";

                    var cost = AITreeChildren(child, "max", deep + 1);

                    child.data[i][j] = null;

                    if(cost < min)
                    {
                        //alert(x);
                        //alert(y);
                        min = cost;
                        x = i;
                        y = j;
                    }
                }
            }
        }
        return [x, y];
    }

    function Board(cell)
    {
        var spot1 = $('#spot1');
        var spot2 = $('#spot2');
        var spot3 = $('#spot3');
        var spot4 = $('#spot4');
        var spot5 = $('#spot5');
        var spot6 = $('#spot6');
        var spot7 = $('#spot7');
        var spot8 = $('#spot8');
        var spot9 = $('#spot9');

        if(cell.is(spot1))
        {
            return [0,0];
        }
        else if(cell.is(spot2))
        {
            return [0,1];
        }
        else if(cell.is(spot3))
        {
            return [0,2];
        }
        else if(cell.is(spot4))
        {
            return [1,0];
        }
        else if(cell.is(spot5))
        {
            return [1,1];
        }
        else if(cell.is(spot6))
        {
            return [1,2];
        }
        else if(cell.is(spot7))
        {
            return [2,0];
        }
        else if(cell.is(spot8))
        {
            return [2,1];
        }
        else if(cell.is(spot9))
        {
            return [2,2];
        }
    }

    function Board2(x, y)
    {
        var spot1 = $('#spot1');
        var spot2 = $('#spot2');
        var spot3 = $('#spot3');
        var spot4 = $('#spot4');
        var spot5 = $('#spot5');
        var spot6 = $('#spot6');
        var spot7 = $('#spot7');
        var spot8 = $('#spot8');
        var spot9 = $('#spot9');

        if(x == 0 && y == 0)
        {
            return spot1;
        }
        else if(x == 0 && y == 1)
        {
            return spot2;
        }
        else if(x == 0 && y == 2)
        {
            return spot3;
        }
        else if(x == 1 && y == 0)
        {
            return spot4;
        }
        else if(x == 1 && y == 1)
        {
            return spot5;
        }
        else if(x == 1 && y == 2)
        {
            return spot6;
        }
        else if(x == 2 && y == 0)
        {
            return spot7;
        }
        else if(x == 2 && y == 1)
        {
            return spot8;
        }
        else if(x == 2 && y == 2)
        {
            return spot9;
        }
    }

    ply = "X";
    winner = null;


    //root = Node;

    // Spot vars
    var spot1 = $('#spot1');
    var spot2 = $('#spot2');
    var spot3 = $('#spot3');
    var spot4 = $('#spot4');
    var spot5 = $('#spot5');
    var spot6 = $('#spot6');
    var spot7 = $('#spot7');
    var spot8 = $('#spot8');
    var spot9 = $('#spot9');

    $('#board li').on('click', function()
                      {
        winner = isGoal(root);

        if(winner == null)
        {
            if($(this).hasClass('disable'))
            {
                alert('This spot is already filled');
            }
            else
            {
                $(this).text("x");
                $(this).addClass('disable x');

                var xy = Board($(this));

                var x = xy[0];
                var y = xy[1];

                root.data[x][y] = "X";

                if(isGoal(root) == null)
                {
                    var xy = AITree(root, 0);

                    var x = xy[0];
                    var y = xy[1];

                    var cell = Board2(x, y);

                    cell.text("o");
                    cell.addClass('disable o');

                    root.data[x][y] = "O";
                }
            }

            winner = isGoal(root);

            if(winner != null)
            {
                setTimeout(function()
                           {

                    if(winner != "Draws")
                    {
                        if(winner == "O")
                        {
                            cpu_win_cntr++; 
                            showModal("AI Wins"); 
                        }
                        else if(winner == "X")
                        {
                            you_win_cntr++;  
                            showModal("You Win"); 
                        }       
                    }
                    else
                    {
                        draws_cntr++; 
                        showModal("Draw");    
                    }

                    $("#you").text(you_win_cntr);
                    $("#cpu").text(cpu_win_cntr);
                    $("#draws").text(draws_cntr);

                },1000);

            }
        }    
    });

    // Reset Handler
    $("#reset").click(function()
                      {
        $("#board li").text(" ");
        $("#board li").removeClass('disable');
        $("#board li").removeClass('o');
        $("#board li").removeClass('x');
        $("#board li").removeAttr( "class" );

        ply = null;
        winner = null;

        root.data = [[null, null, null],
                     [null, null, null],
                     [null, null, null]];
    });

    $('input[type=radio][name=level]').change(function() 
                                              {
        if (this.value == '1') {
            AllowedTreeDeep = 1;
        }
        else if (this.value == '2') {
            AllowedTreeDeep = 2;
        }
        else if (this.value == '3') {
            AllowedTreeDeep = 9;
        }
    });
});