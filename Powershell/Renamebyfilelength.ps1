#Bulk renamer of files when I screw up.

$files = @{
"569146927" = "1 D1.mkv"; 
"361297402" = "1_D2.mkv";
}

Get-ChildItem -Filter "*" -Recurse | Rename-Item -NewName {$files.Get_Item($_.Length.toString()) }