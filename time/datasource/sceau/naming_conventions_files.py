# coding: utf-8

# toutes les chaines sont en unicode (même les docstrings)
from __future__ import unicode_literals

import getopt
import os
import re
import sys
import unicodedata

import unidecode


# rules


def ridoffbadchars(s):
    r = s;
    # as a last resort get rid of still unknown unicode characters
    r = re.sub("\uf018", "_", r);
    r = re.sub("\uf019", "_", r);
    r = re.sub("\uf020", "_", r);
    r = re.sub("\uf021", "_", r);
    r = re.sub("\uf022", "_", r);
    r = re.sub("\uf023", "_", r);
    r = re.sub("\uf024", "_", r);
    r = re.sub("\uf025", "_", r);
    r = re.sub("\uf026", "_", r);
    r = re.sub("\uf027", "_", r);
    r = re.sub("\uf028", "_", r);
    r = re.sub("\uf029", "_", r);
    r = re.sub("\uf030", "_", r);
    r = re.sub("\uf031", "_", r);

    return r;


def accentsTidyP2(s):
    # N° decomes n_
    r = re.sub("ndeg ", "#", s);
    r = re.sub("ndeg", "#", s);
    # remove too many '_'
    r = re.sub("__", "_", r);
    r = re.sub("__", "_", r);
    # remove too many '_-_'
    r = re.sub("_-_", "-", r);
    # remove '_' at start or end of dir name in the chain of subs (_sub1_\_sub2_\_sub3_) => (sub1\sub2\sub3)
    # replace '\_' by '\', '_\' by '\'
    litteral_backslash = r"\\";
    litteral_b1 = r"\\_";
    litteral_b2 = r"_\\";
    r = re.sub(litteral_b1, litteral_backslash, r);
    r = re.sub(litteral_b2, litteral_backslash, r);
    # important, a '_' at beginning or end of dir chain should also be removed, else won't be able to rename
    r = re.sub('^_', '', r);
    r = re.sub('_$', '', r);

    r = re.sub("degdeg", "deg", r);
    r = re.sub("degdeg", "deg", r);
    r = re.sub("degdeg", "deg", r);
    r = re.sub("degdeg", "deg", r);
    r = re.sub("degdeg", "deg", r);

    r = re.sub('_deg$', '', r);
    r = re.sub('deg$', '', r);

    # as a last resort get rid of still unknown unicode characters
    r = ridoffbadchars(r);

    return r;


def accentsTidyP1(s):
    # tries to convert as best as it can anything in ascii characters (special case : '°' becomes 'deg' !)
    r = unidecode.unidecode(s)
    # go lower case
    r = r.lower();
    # æ becomes ae
    r = re.sub("/æ/g", "ae", r);
    # œ becomes oe
    r = re.sub("/œ/g", "oe", r);

    return r;


def accentsTidy(s):
    # special case of '.\' to keep for the root dirs...
    if ((s[0] == '.') and (s[1] == '\\')):
        return '.' + '\\' + accentsTidy(s[2:]);

    r = accentsTidyP1(s);
    # anything that is neither a letter nor a number nor a \ nor '-' is replaced by _
    r = re.sub("[^-\d\w\\\/]", '_', r);
    return accentsTidyP2(r);


def accentsTidyFiles(s):
    # special case of '.\' to keep for the root dirs...
    if ((s[0] == '.') and (s[1] == '\\')):
        return '.' + '\\' + accentsTidy(s[2:]);

    r = accentsTidyP1(s)
    # anything that is neither a letter nor a number nor a \ nor '-' nor '.' is replaced by _
    r = re.sub("[^-.(&)#\d\w\\\/]", '_', r);
    # only keep the last '.'
    pcount = r.count('.')
    if (pcount > 1):
        r = r.replace('.', '_', pcount - 1);
    return accentsTidyP2(r);


def lastCleanup(sout):
    sout = re.sub('_\.', '.', sout);
    sout = re.sub('\-\.', '.', sout);
    sout = re.sub('_\-', '_', sout);  # les _- -->  _
    sout = re.sub('\-$', '', sout);  # retirer les - à la fin
    return sout


minYear = 1880
maxYear = 2200


def correctPureYMD(s, regexen):
    matched = regexen.search(s)
    if matched:  # push it to the front, order reversed
        splits = regexen.split(s)
        if int(splits[1]) > maxYear:
            return (s, False)
        if int(splits[1]) < minYear:
            return (s, False)
        if int(splits[2]) > 12:
            return (s, False)
        if int(splits[3]) > 31:
            return (s, False)
        sout = splits[1] + '-' + splits[2] + '-' + splits[3] + '_' + splits[0]
        for i in range(4, (len(splits))):
            sout = sout + splits[i]
        sout = accentsTidyP2(sout);
        sout = lastCleanup(sout)
        return (sout, True)
    return (s, False)


def correctYMD(s, regexen, regexus):
    matched = regexen.search(s)
    if matched:  # push it to the front, order reversed
        splits = regexen.split(s)
        if splits[2] != splits[4]:
            return (s, False)
        if int(splits[5]) > maxYear:
            return (s, False)
        if int(splits[5]) < minYear:
            return (s, False)
        if int(splits[3]) > 12:
            return (s, False)
        if int(splits[1]) > 31:
            return (s, False)
        sout = splits[5] + '-' + splits[3].zfill(2) + '-' + splits[1].zfill(2) + '_' + splits[0]
        for i in range(6, (len(splits))):
            sout = sout + splits[i]
        sout = accentsTidyP2(sout);
        sout = lastCleanup(sout)
        return (sout, True)

    matched = regexus.search(s)
    if matched:  # push it to the front, order unchanged
        splits = regexus.split(s)
        splits3 = splits[3]
        splits5 = splits[5]
        if splits[2] != splits[4]:
            return (s, False)
        if int(splits[1]) > maxYear:
            return (s, False)
        if int(splits[1]) < minYear:
            return (s, False)
        if (splits3 != 'xx'):
            if int(splits3) > 12:
                return (s, False)
            else:
                splits3 = splits3.zfill(2)
        if (splits5 != 'xx'):
            #		print(splits5)
            #		print(s)
            if int(splits5) > 31:
                return (s, False)
            else:
                splits5 = splits5.zfill(2)
        sout = splits[1] + '-' + splits3 + '-' + splits5 + '_' + splits[0]
        for i in range(6, (len(splits))):
            sout = sout + splits[i]
        sout = accentsTidyP2(sout);
        sout = lastCleanup(sout)
        return (sout, True)
    return (s, False)


def correctYM(s, regexen, regexus):
    matched = regexen.search(s)
    if matched:  # push it to the front, order reversed
        splits = regexen.split(s)
        if int(splits[3]) > maxYear:
            return (s, False)
        if int(splits[3]) < minYear:
            return (s, False)
        if int(splits[1]) > 12:
            return (s, False)
        sout = splits[3] + '-' + splits[1].zfill(2) + '_' + splits[0]
        for i in range(4, (len(splits))):
            sout = sout + splits[i]
        sout = accentsTidyP2(sout);
        sout = lastCleanup(sout)
        return (sout, True)

    matched = regexus.search(s)
    if matched:  # push it to the front, order unchanged
        splits = regexus.split(s)
        if int(splits[1]) > maxYear:
            return (s, False)
        if int(splits[1]) < minYear:
            return (s, False)
        if int(splits[3]) > 12:
            return (s, False)
        sout = splits[1] + '-' + splits[3].zfill(2) + '_' + splits[0]
        for i in range(4, (len(splits))):
            sout = sout + splits[i]
        sout = accentsTidyP2(sout);
        sout = lastCleanup(sout)
        return (sout, True)
    return (s, False)


def correctY(s, regex):
    matched = regex.search(s)
    if matched:  # push it to the front, order reversed
        splits = regex.split(s)
        if int(splits[1]) > maxYear:
            return (s, False)
        if int(splits[1]) < minYear:
            return (s, False)
        sout = splits[1] + '_' + splits[0]
        for i in range(2, (len(splits))):
            sout = sout + splits[i]
        sout = accentsTidyP2(sout);
        sout = lastCleanup(sout)
        return (sout, True)
    return (s, False)


def correctYY(s, regex):
    matched = regex.search(s)
    if matched:  # push it to the front, separated by -
        splits = regex.split(s)
        if int(splits[1]) > maxYear:
            return (s, False)
        if int(splits[1]) < minYear:
            return (s, False)
        if int(splits[3]) > maxYear:
            return (s, False)
        if int(splits[3]) < minYear:
            return (s, False)
        sout = splits[1] + '-' + splits[3] + '_' + splits[0]
        for i in range(4, (len(splits))):
            sout = sout + splits[i]
        sout = accentsTidyP2(sout);
        sout = lastCleanup(sout)
        return (sout, True)
    return (s, False)


# Regex built using https://regex101.com/ and https://docs.python.org/3/library/re.html
# 3 groups DD MM YYYY
# 2 groups separator
regExDatesDDMMYYYY = re.compile(r'(\d\d*)([\/\-_ ])(\d\d*)([\/\-_ ])(\d\d\d\d)')
regExDatesMMYYYY = re.compile("(\d\d*)([\/\-_ ])(\d\d\d\d)")
regExDatesYYYYMMDD = re.compile(r'(\d\d\d\d)([\/\-_ ])([x\d][x\d*])([\/\-_ ])([x\d][x\d*])')
regExDatesYYYYMM = re.compile('(\d\d\d\d)([\/\-_ ])(\d\d*)')
regExDatesYYYY = re.compile("(\d\d\d\d)")

regExDatesPureYYYYMMDD = re.compile(r'(\d\d\d\d)(\d\d)(\d\d)')

regExDatesYYYYtoYYYY = re.compile('(\d\d\d\d)([\/\-_ ])(\d\d\d\d)')


def subs_dates(s):
    (s, matched) = correctYY(s, regExDatesYYYYtoYYYY)
    if not matched:
        (s, matched) = correctYMD(s, regExDatesDDMMYYYY, regExDatesYYYYMMDD)
        if not matched:
            (s, matched) = correctYM(s, regExDatesMMYYYY, regExDatesYYYYMM)
            if not matched:
                (s, matched) = correctPureYMD(s, regExDatesPureYYYYMMDD)
                if not matched:
                    (s, matched) = correctY(s, regExDatesYYYY)
    return s


logFileName = 'logrename.txt'
logFile = open(logFileName, 'a')


def printandlog(str):
    print(str)
    logFile.write(str + "\n")
    return


def printandlogNoRC(str):
    print(str, end='')
    logFile.write(str)
    return


def printandlogTuple(tuple):
    print(tuple)
    logFile.write(''.join(tuple))
    return


def same_string(a, b):
    return ((a.find(b) == 0) and (b.find(a) == 0))


def process(do_rename_dir, do_rename_files, do_dates=0):
    print("A sound will be produced at the end of the processing.")
    print("What follows is also logged into the file logRename.txt\r\n")
    print('Press <ctrl>+C to abort')
    printandlog("########################################")

    # Set the directory you want to start from
    rootDir = '.'
    nbChanges = 0

    # Simulation : we only parse the subs, don't need the full path
    if (not do_rename_dir):
        nbDir = 0
        for dirName, subdirList, fileList in os.walk(rootDir):
            for subdir in subdirList:
                if subdir == '__pycache__':
                    continue
                stripped = accentsTidy(subdir)
                if (do_dates):
                    stripped = subs_dates(stripped)
                nbDir = nbDir + 1
                if (same_string(stripped, subdir)):
                    printandlogNoRC('.');
                    sys.stdout.flush()
                else:
                    nbChanges = nbChanges + 1
                    printandlog("\n" + dirName + "\\" + stripped + "  <--  " + dirName + "\\" + ridoffbadchars(subdir));
    else:
        # Real Deal, we parse all the dirs using path from the rootDir, one by one, in O(n2)... Slow, not smart, but small code.
        found = 1
        while (found):
            found = 0
            nbDir = 0
            for dirName, subdirList, fileList in os.walk(rootDir):
                if dirName == '..':
                    continue
                if dirName == '.\\__pycache__':
                    continue

                for subdir in subdirList:
                    if subdir == '__pycache__':
                        continue
                    if subdir == '.':
                        continue
                    if subdir == '..':
                        continue
                    stripped = accentsTidy(subdir)
                    if (do_dates):
                        stripped = subs_dates(stripped)
                    nbDir = nbDir + 1
                    if (same_string(stripped, subdir)):
                        printandlogNoRC('.');
                        sys.stdout.flush()
                    else:
                        if (not found):
                            nbChanges = nbChanges + 1
                            printandlog("");
                            strippedFullPath = dirName + "\\" + stripped
                            origFullPath = dirName + "\\" + ridoffbadchars(subdir)
                            printandlog("\n" + strippedFullPath + "  <--  " + ridoffbadchars(subdir));
                            try:
                                os.rename(origFullPath, strippedFullPath)
                            except:
                                print(
                                    "Dir. renaming was refused by the PC. Check that you don't have a file open in the file tree. You might need to close some file explorer. You may also be in a situation of dir already existing due to a previous renaming");
                                return;
                            found = 1
                            break

    # BELL
    print('\a')
    printandlog('\n')

    if (nbChanges == 0):
        printandlog("no change needed, all %i directories are already in compliance" % nbDir)
    else:
        if (do_rename_dir):
            printandlog("%i change(s) done in a total of %i directories" % (nbChanges, nbDir))
        else:
            printandlog("%i change(s) needed in a total of %i directories" % (nbChanges, nbDir))
            printandlog(
                "this was a simulation, if you are happy with this renaming proposal, use 'naming_conventions_do_rename.py'");
    print("\nAll this was logged at the end of the file " + logFileName);

    nbFiles = 0
    nbFileChanges = 0

    if (not do_rename_files):
        for dirName, subdirList, fileList in os.walk(rootDir):
            if dirName == '..':
                continue
            if dirName == '.\\__pycache__':
                continue
            for file in fileList:
                stripped = accentsTidyFiles(file)
                if (do_dates):
                    stripped = subs_dates(stripped)
                nbFiles = nbFiles + 1
                if (same_string(stripped, file)):
                    printandlogNoRC('*');
                    sys.stdout.flush()
                else:
                    nbFileChanges = nbFileChanges + 1
                    printandlog("\n" + dirName + "\\" + stripped + "  <--  " + ridoffbadchars(file));

    else:
        # Real Deal, we parse all the files using path from the rootDir, one by one, in O(n2)... Slow, not smart, but small code.
        found = 1
        while (found):
            found = 0
            for dirName, subdirList, fileList in os.walk(rootDir):
                if dirName == '.\\__pycache__':
                    continue

                for file in fileList:
                    stripped = accentsTidyFiles(file)
                    if (do_dates):
                        stripped = subs_dates(stripped)
                    nbFiles = nbFiles + 1
                    if (same_string(stripped, file)):
                        printandlogNoRC('*');
                        sys.stdout.flush()
                    else:
                        nbFileChanges = nbFileChanges + 1
                        orig_full_path = dirName + "\\" + file
                        stripped_full_path = dirName + "\\" + stripped;
                        printandlog("\n" + dirName + "\\" + stripped + "  <--  " + ridoffbadchars(file));
                        try:
                            os.rename(orig_full_path, stripped_full_path)
                        except:
                            print(
                                "File renaming was refused by the PC. Check that you don't have a file open in the file tree. You might need to close some file explorer. You may also be in a situation of file already existing due to a previous renaming");
                            return;
                        found = 1

    # BELL
    print('\a')
    printandlog('\n')

    if (nbFileChanges == 0):
        printandlog("no change needed, all %i files are already in compliance" % nbFiles)
    else:
        if (do_rename_files):
            printandlog("%i change(s) done in a total of %i files" % (nbFileChanges, nbFiles))
        else:
            printandlog("%i change(s) needed in a total of %i files" % (nbFileChanges, nbFiles))
            printandlog(
                "this was a simulation, if you are happy with this renaming proposal, use 'naming_conventions_do_rename.py'");
    print("\nAll this was logged at the end of the file " + logFileName);


def test():
    s = 'æÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝœ- áàâäãåçéèêëíìîïñóòôöõúùûüý ÿ'
    print(s)
    s1 = accentsTidy(s)
    print(s1)
    s2 = unicodedata.normalize('NFD', s1).encode('ascii', 'ignore')
    print();
    print(s1)
    print();


def print_syntax():
    print('syntax for simulation, with no effect on the name of the files or directories, for validation purposes:')
    print('naming_conventions_files.py')
    print('syntax for renaming effectively the files:')
    print('naming_conventions_files.py -w')
    print('syntax for renaming effectively the directories:')
    print('naming_conventions_files.py -d')
    print(
        'additional option -t to use if one want dates to be moved to the front of the names and reorganized in YYYY-MM-DD format')
    print('all 3 options can be combined')
    os.system("pause")


def main(argv):
    if (len(sys.argv) == 1):
        process(0, 0, 0)
        os.system("pause")
    else:
        do_files = 0
        do_dir = 0
        do_dates = 0
        try:
            opts, args = getopt.getopt(argv, "hwdt")
        except getopt.GetoptError:
            print_syntax()
            sys.exit(2)
        for opt, arg in opts:
            if opt == '-t':
                do_dates = 1
            elif opt == '-w':
                do_files = 1
            elif opt == '-d':
                do_dir = 1
            elif opt == '-h':
                print_syntax()
                sys.exit()

        process(do_dir, do_files, do_dates)
        os.system("pause")
        sys.exit()


if __name__ == "__main__":
    main(sys.argv[1:])
